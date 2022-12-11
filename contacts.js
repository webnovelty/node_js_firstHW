
const { v4 } = require("uuid");
const contactsPath = require("./contactsPath");
const updateContacts = require("./updateContacts");


const fs = require('fs/promises');
// TODO: задокументировать каждую функцию
const listContacts = async() => {

	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
}

const getContactById = async(id) => {
	const contacts = await listContacts();
	const result = contacts.find(item => item.id === id);
	if (!result) {
		return null;

	}
	return result;
	
}

const removeContact = async (id) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex(item => item.id === id);
	if (idx === -1) {
		return null;
	}
	const newContacts = contacts.filter((_, index) => index !== idx);
	await updateContacts(newContacts);
	return contacts[idx];

}

const addContact = async (name, email, phone) => {
	const contacts = await listContacts();
	const newContact = { id: v4(), name, email, phone };
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
}

const updateContact = async (id, name, email, phone) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex(item => item.id === id);
	if (idx === -1)
	{
		return null;
		}
	contacts[idx] = { id, name, email, phone };
	await updateContacts(contacts);
	return contacts[idx];
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact }