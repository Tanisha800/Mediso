import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export const seedDefaultUsers = async () => {
  const SALT_ROUNDS = 10;

  // 1. ADMIN
  await prisma.user.upsert({
    where: { email: "john@gmail.com" },
    update: {},
    create: {
      name: "John Admin",
      email: "john@gmail.com",
      passwordHash: await bcrypt.hash("87654321", SALT_ROUNDS),
      role: "admin",
    },
  });

  // 2. DOCTOR
  await prisma.user.upsert({
    where: { email: "doctor@test.com" },
    update: {},
    create: {
      name: "Dr. Smith",
      email: "doctor@test.com",
      passwordHash: await bcrypt.hash("123456", SALT_ROUNDS),
      role: "doctor",
    },
  });

  // Ensure the seeded doctor login has a matching Doctor profile
  await prisma.doctor.upsert({
    where: { email: "doctor@test.com" },
    update: { status: "Active" },
    create: {
      name: "Dr. Smith",
      specialization: "General",
      email: "doctor@test.com",
      phone: "+1 (000) 000-0000",
      experience: "10 years",
      status: "Active",
    },
  });

  // 3. PATIENT
  await prisma.user.upsert({
    where: { email: "patient@test.com" },
    update: {},
    create: {
      name: "Jane Doe",
      email: "patient@test.com",
      passwordHash: await bcrypt.hash("123456", SALT_ROUNDS),
      role: "patient",
    },
  });

  // Ensure patient profile exists
  await prisma.patient.upsert({
    where: { email: "patient@test.com" },
    update: {},
    create: {
      name: "Jane Doe",
      email: "patient@test.com",
      gender: "Female",
      age: 34,
      phone: "+1 (000) 111-2222",
    }
  })

  console.log("Default users seeded");
};

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = (data: {
  name: string;
  email: string;
  passwordHash: string;
  role?: string;
}) => prisma.user.create({ data });

export const upsertUserByEmail = (email: string, data: { name: string; passwordHash: string; role: string }) =>
  prisma.user.upsert({
    where: { email },
    update: {
      name: data.name,
      passwordHash: data.passwordHash,
      role: data.role,
    },
    create: {
      name: data.name,
      email,
      passwordHash: data.passwordHash,
      role: data.role,
    },
  });
