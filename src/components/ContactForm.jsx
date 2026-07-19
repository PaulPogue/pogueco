import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaPaperPlane } from "react-icons/fa";

const ContactForm = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "9aa12415-234d-490f-9061-3749e91474e2");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        html: `<p class="swal2-text">Thank you — we’ll be in touch soon.</p>`,
        showConfirmButton: true,
        confirmButtonText: "OK",
        buttonsStyling: false, // let our classes take over
        background: "#ffffff",
        color: "#0f172a", // slate-900
        iconColor: "var(--firmBlue)",
        customClass: {
          popup: "swal2-site-popup",
          title: "swal2-site-title",
          htmlContainer: "swal2-site-html",
          confirmButton: "swal2-site-confirm",
        },
      }).then(() => {
        window.location.href = "/";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again.",
        buttonsStyling: false,
        background: "#ffffff",
        color: "#0f172a",
        iconColor: "#dc2626",
        customClass: {
          popup: "swal2-site-popup",
          title: "swal2-site-title",
          htmlContainer: "swal2-site-html",
          confirmButton: "swal2-site-confirm",
        },
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <div className="contact-form-fields">
        <input
          type="text"
          className="contact-field"
          placeholder="* Name"
          name="name"
          autoComplete="name"
          required
        />

        <input
          type="email"
          className="contact-field"
          placeholder="* Email"
          name="email"
          autoComplete="email"
          required
        />

        <input
          type="tel"
          className="contact-field"
          placeholder="Phone"
          name="phone"
          autoComplete="tel"
        />

        <input
          type="text"
          className="contact-field"
          placeholder="Preferred Contact Method"
          name="contactmethod"
        />

        <textarea
          name="message"
          className="contact-field"
          placeholder="* What would you like to talk about?"
          required
        />
      </div>

      <div className="contact-form-actions">
        <button type="submit" className="contact-submit">
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
