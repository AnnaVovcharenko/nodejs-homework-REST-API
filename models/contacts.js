const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');



const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const resCont = contacts.find(item => item.id === id);
  return resCont || null;

}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indxCont = contacts.findIndex(item => item.id === contactId);
  if (indxCont === -1) {
    return null;
  };
  const [resCont] = contacts.splice(indxCont, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return resCont;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body }; 
  
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact;
}


// const updateContact = async (contactId, { name, email, phone }) => {
//   const contacts = await listContacts();
//   const dataContact = contacts.findIndex(item => item.id === contactId);
//   if (dataContact === -1) {
//     return null
//   }

//   const [resData] = contacts.filter()
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
// }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact
}