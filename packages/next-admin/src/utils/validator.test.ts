import { validate } from "../utils/validator";

describe("validator", () => {
  it("should not validate if there is no config", () => {
    expect(() =>
      validate({
        id: "1",
        email: "bob@yopmail.com",
      })
    ).not.toThrow();
  });

  it("should validate fields properly", () => {
    expect(() =>
      validate<"user">(
        {
          id: "1",
          email: "bob.com",
        },
        {
          email: {
            validate: (email) => email.includes("@") || "Invalid email",
          },
        }
      )
    ).toThrow("Validation error");
  });
});
