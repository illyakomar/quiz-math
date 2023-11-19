import zod from "zod";

export const leadSchema = zod.object({
  name: zod
    .string({ required_error: "Введіть прізвище та ім’я" })
    .min(2, "Закороткий прізвище та ім’я")
    .max(360, "Завеликий прізвище та ім’я"),
});
