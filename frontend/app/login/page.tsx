"use client";

import "./style.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { getToken } from "../utils/fetchData";

interface FormData {
  email: string;
  password: string;
}

type Errors = {
  [key in keyof FormData]?: string;
};

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/");
    }
  }, [router]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [allErrors, setAllErrors] = useState("");

  const [errors, setErrors] = useState<Errors>({});

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("فیلد ایمیل معتبر نیست")
      .required("فیلد ایمیل الزامی است"),
    password: Yup.string()
      .required("فیلد گذرواژه الزامی است")
      .min(8, "فیلد گذرواژه حداقل باید ۸ کاراکتر باشد"),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setAllErrors("");
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        router.push("/");
      } else {
        setAllErrors("ایمیل یا پسورد اشتباه است");
      }
    } catch (validationErrors: any) {
      const formattedErrors: Errors = {};
      validationErrors.inner.forEach((err: Yup.ValidationError) => {
        formattedErrors[err.path as keyof FormData] = err.message;
      });
      setErrors(formattedErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center m-auto align-items-center w-100 overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="d-flex">
        <Image
          src={
            "https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
          }
          alt="sabz Learn Icon"
          width={100}
          height={62}
        />
        <h1 className="d-flex align-items-center me-3 fw-bold">سبزلرن</h1>
      </div>
      <main className="bg-white login-main p-4 rounded-4 mt-4">
        <h3 className="text-center fw-bold">ورود با ایمیل</h3>
        <p className="text-center mt-3">
          حساب کاربری ندارید ؟‌{" "}
          <Link
            style={{ color: "rgb(87, 214, 134)", fontWeight: "bold" }}
            href={"signup"}
          >
            ثبت نام کنید
          </Link>
        </p>

        <form onSubmit={handleFormSubmit}>
          <div className="p-2 d-flex align-items-center login-input-container">
            <input
              className="w-100 h-100 border-0"
              type="text"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="آدرس ایمیل"
            />
            <i className="fa-regular fa-envelope"></i>
          </div>
          {errors.email && <p className="text-danger">{errors.email}</p>}

          <div className="p-2 d-flex align-items-center login-input-container">
            <input
              className="w-100 h-100 border-0"
              type="password"
              placeholder="گذرواژه"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          {errors.password && <p className="text-danger">{errors.password}</p>}
          <button
            disabled={isLoading}
            className="d-block m-auto   mt-4 text-white"
          >
            {!isLoading ? "ادامه" : "در حال بررسی"}
          </button>
        </form>
        {allErrors ? (
          <p className="text-danger text-center mt-4">{allErrors}</p>
        ) : null}
      </main>
      <p style={{ fontSize: "20px" }} className="text-center mt-4 ">
        با عضویت در سایت، تمامی قوانین و شرایط استفاده <br /> از خدمات سبزلرن را
        پذیرفته اید.
      </p>
    </div>
  );
};

export default LoginPage;