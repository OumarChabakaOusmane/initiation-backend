// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// const PORT = process.env.PORT;

// // Connect to MongoDB database
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Successfully connected to database");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Create a schema
// const schema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // create students model
// const studentModel = mongoose.model("students", schema);

// // Middleware
// app.use(express.json());

// // Routes

// // Get all students
// app.get("/students", async (req, res) => {
//   const students = await studentModel.find();

//   res.send({
//     students,
//   });
// });

// // Get a single student by its ID
// app.get("/students/:id", async (req, res) => {
//   const id = req.params.id;

//   const student = await studentModel.findById(id); // .find({_id: studentId})

//   if (!student) {
//     res.status(404).send({
//       message: "Student not found.",
//     });
//     return;
//   }

//   res.send({ student });
// });

// // Add a new students
// app.post("/students", async (req, res) => {
//   const student = req.body;
//   //   console.log(student);

//   try {
//     await studentModel.create(student);
//   } catch (error) {
//     res.send({
//       message: error.message,
//     });
//     return;
//   }

//   res.send({
//     message: "Student added successfully",
//     student,
//   });
// });

// // Expose the server on the defined port
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });