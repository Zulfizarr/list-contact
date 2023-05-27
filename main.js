window.addEventListener("DOMContentLoaded",()=>{

    const form = document.getElementById("add-contact-form");
    const nameInput = document.getElementById("name-input");
    const phoneInput = document.getElementById("phone-input");
    const contactList = document.getElementById("contact-list");
    const contactTemplate = document.getElementById("contact-template");
  
    // Formni yuborish hodisasi
    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = nameInput.value;
      const phone = phoneInput.value;
      const contact = { name, phone };
      if (isContactExists(contact)) {
        alert("This contact already exists!");
      } else {
        saveContact(contact);
        displayContacts();
      }
      form.reset();
    });
  
    // Kontakt mavjudligini tekshirish
    function isContactExists(contact) {
      const contacts = getContacts();
      return contacts.findIndex(c => c.phone === contact.phone) !== -1;
    }
  
    // Kontakt qo'shish
    function saveContact(contact) {
      let contacts = getContacts();
      contacts.push(contact);
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  
    // Kontaktlarni olish
    function getContacts() {
      let contacts = localStorage.getItem("contacts");
      if (!contacts) {
        return [];
      }
      return JSON.parse(contacts);
    }
  
    // Kontaktlarni ko'rsatish
    function displayContacts() {
      contactList.innerHTML = "";
     const contacts = getContacts();
      for (const contact of contacts) {
        const contactElement = document.importNode(contactTemplate.content, true);
        const nameElement = contactElement.querySelector(".contact-name");
        nameElement.textContent = contact.name;
        const phoneElement = contactElement.querySelector(".contact-phone");
        phoneElement.textContent = contact.phone;
        phoneElement.href = `tel:${contact.phone}`;
        const deleteButton = contactElement.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
          deleteContact(contact.phone);
          displayContacts();
        });
        contactList.appendChild(contactElement);
      }
    }
  
    // Kontakt o'chirish
    function deleteContact(phone) {
      let contacts = getContacts();
      contacts = contacts.filter(c => c.phone !== phone);
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  
    // Sahifani yuklanganda kontaktlarni ko'rsatish
    displayContacts();
    
    
})
