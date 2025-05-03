import React, { useState } from "react";
import "../assets/styles/createProjCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

/* ------------------------------- Головна функція ------------------------------- */
const CreateStartupPage = () => {
  const [logoSrc, setLogoSrc] = useState("");
  const [visibleExperience, setVisibleExperience] = useState({});

  /* ------------------------ Завантаження логотипу ------------------------ */
  const previewLogo = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setLogoSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  /* ---------------------- Перемикання поля досвіду ---------------------- */
  const toggleExperienceField = (specialization) => {
    setVisibleExperience((prev) => ({
      ...prev,
      [specialization]: !prev[specialization],
    }));
  };

  /* ---------------------- Очищення вибраних тегів ---------------------- */
  const clearSelection = () => {
    setVisibleExperience({});
  };

  return (
    <>
      <MyHeader/>
      <section className="create-project">
        <div className="info">
          <h2 className="create-title">Створи свій Стартап</h2>
        </div>
        <div className="container">
          <form action="#" method="POST">
            <div className="form-group">
              <label htmlFor="startup-name" className="label-create-proj">Назва стартапу *</label>
              <input type="text" id="startup-name" name="startup-name" required className="input-info-create" />
            </div>

            <div className="form-group">
  <label htmlFor="photo-upload" className="label-create-prof">Фото</label>

  {logoSrc && (
    <img
      id="logo-preview"
      src={logoSrc}
      alt="Logo Preview"
      style={{
        display: 'block',
        maxWidth: '100px',
        marginTop: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
      }}
    />
  )}

  <div className="custom-file-upload">
    <label htmlFor="photo-upload" className="upload-label">Завантажити фото</label>
    <input
      type="file"
      id="photo-upload"
      name="photo-upload"
      accept="image/*"
      onChange={previewLogo}
    />
  </div>
</div>

            <div className="form-group">
              <label htmlFor="contact-info" className="label-create-proj">Контактна інформація *</label>
              <input type="text" id="contact-info" name="contact-info" required className="input-info-create-proj" />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="label-create-proj">Опис *</label>
              <textarea id="description" name="description" required className="input-info-create-proj text" ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category" className="label-create-proj">Категорія *</label>
              <select id="category" name="category" required className="input-info-create-proj" >
                <option value="">- Вибрати -</option>
                <option value="it">IT</option>
                <option value="production">Виробництво</option>
                <option value="other">Інше</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="investment" className="label-create-proj">Необхідні інвестиції</label>
              <input type="text" id="investment" name="investment" required className="input-info-create-proj" />
            </div>

            <div className="form-group">
              <label htmlFor="team-members" className="label-create-proj">Необхідні члени команди</label>
              <label htmlFor="specializations" className="label-create-proj">Вкажіть спеціальності:</label>
              <div className="tags">
                {[
                  { id: "analize", label: "Аналіз даних" },
                  { id: "marketing", label: "Маркетолог" },
                  { id: "web-prog", label: "Веб-розробник" },
                  { id: "finance", label: "Фінансист" },
                  { id: "designer", label: "Дизайнер" },
                  { id: "developer", label: "Розробник ПЗ" },
                ].map((spec) => (
                  <button
                    key={spec.id}
                    type="button"
                    className="tag"
                    id="formbtn"
                    onClick={() => toggleExperienceField(spec.id)}
                  >
                    {spec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ---------------- Відображення полів досвіду ---------------- */}
            {[
              { id: "marketing", label: "Маркетолог" },
              { id: "developer", label: "Розробник ПЗ" },
              { id: "designer", label: "Дизайнер" },
              { id: "analize", label: "Аналіз даних" },
              { id: "finance", label: "Фінансист" },
              { id: "web-prog", label: "Веб-розробник" },
            ].map(
              (spec) =>
                visibleExperience[spec.id] && (
                  <div
                    className="form-group"
                    id={`experience_${spec.id}`}
                    key={spec.id}
                    style={{ display: "block" }}
                  >
                    <label htmlFor={`experience-${spec.id}-input`} className="label-create-proj">
                      Досвід роботи "{spec.label}":
                    </label>
                    <input
                      type="text"
                      id={`experience-${spec.id}-input`}
                      name={`experience-${spec.id}`}
                      className="input-info-create-proj" 
                    />
                  </div>
                )
            )}

            <button type="button" id="formbtnCl" onClick={clearSelection}>
              Очистити вибір
            </button>
            <br />
            <button type="submit" id="formbtnS">
              Зберегти
            </button>
          </form>
        </div>
      </section>

      <MyFooter/>
    </>
  );
};

export default CreateStartupPage;
