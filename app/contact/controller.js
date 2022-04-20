const db = require("../db/models/");

class Contact {
  constructor() {
    console.log("contact constructor");
  }

  index = async (req, res) => {
    try {
      const contacts = await db.Contact.findAll();
      if (contacts.length) {
        res.status(200).json({
          message: "success get all data",
          data: contacts,
        });
      } else {
        res.status(503).json({
          message: "data is empty",
          data: [],
        });
      }
    } catch (error) {
      res.status(400).json({
        meesage: error.meesage,
      });
    }
  };

  show = async (req, res) => {
    try {
      let { id } = req.params;
      const contact = await db.Contact.findOne({
        where: { id: id },
      });
      if (contact) {
        res.status(200).json({
          message: "success get data",
          data: contact,
        });
      } else {
        res.status(503).json({
          message: "data not found",
          data: {},
        });
      }
    } catch (error) {
      res.status(400).json({
        meesage: error.meesage,
      });
    }
  };

  post = async (req, res) => {
    let { name, phone } = req.body;
    try {
      let names = name.toLowerCase();
      let modifiedName = names.split(" ").join("+");
      let avatar = `https://ui-avatars.com/api/?background=random&name=${modifiedName}`;
      const dataCreated = await db.Contact.create({
        name,
        phone,
        avatar,
      });
      if (dataCreated) {
        res.status(201).json({
          message: "success create data",
        });
      } else {
        res.status(301).json({
          message: "failed create data",
        });
      }
    } catch (error) {
      res.status(400).json({
        meesage: error.meesage,
      });
    }
  };

  update = async (req, res) => {
    try {
      let { name, phone } = req.body;
      let { id } = req.params;

      let names = name.toLowerCase();
      let modifiedName = names.split(" ").join("");

      const contact = await db.Contact.findOne({
        where: { id: id },
      });

      contact.name = name;
      contact.phone = phone;
      contact.avatar = `https://ui-avatars.com/api/?background=random&name=${modifiedName}`;

      const result = await contact.save();

      if (result) {
        res.status(200).json({
          message: "success update data",
        });
      }
    } catch (error) {
      res.status(400).json({
        meesage: error.meesage,
      });
    }
  };

  destroy = async (req, res) => {
    try {
      let { id } = req.params;
      const contact = await db.Contact.destroy({
        where: { id: id },
      });

      if (contact) {
        res.status(200).json({
          message: "success delete data",
        });
      }
    } catch (error) {
      res.status(400).json({
        meesage: error.meesage,
      });
    }
  };
}

module.exports = new Contact();
