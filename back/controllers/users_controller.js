import User from "../models/users_model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno


// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);
console.log("Contraseña hasheada:", hashedPassword);

    const new_user = new User({ name, email, password: hashedPassword });
    await new_user.save();

    res.status(201).json(new_user);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el usuario", error });
  }
};


// Ver todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error })
  }
}

//Modificar un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Encuentra y actualiza el usuario por su ID
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    res.status(200).json({ message: "Usuario actualizado con exito", user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error })
  }
}


// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: "Usuario eliminado con exito" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error })
  }
}





// Inicio de sesión
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si los datos están completos
    if (!email || !password) {
      return res.status(400).json({ message: "Por favor, proporciona email y contraseña." });
    }

    // Verifica si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verifica si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Genera un token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // Responde con los datos del usuario y el token
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error); // Registra el error en la consola
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
