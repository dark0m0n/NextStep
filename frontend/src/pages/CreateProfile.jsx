import React, { useState } from 'react';
import '../assets/styles/createProfileCSS.css'; 
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";


export default function CreateProfile() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [skills, setSkills] = useState(['']);

  const previewLogo = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const toggleExperienceField = (specialization) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization)
        ? prev.filter((item) => item !== specialization)
        : [...prev, specialization]
    );
  };

  const clearSelection = () => setSelectedSpecializations([]);

  const addSkill = () => setSkills([...skills, '']);

  const deleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const clearSkills = () => setSkills(['']);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password.length <8) {
    alert('Пароль має містити щонайменше 8 символів.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Паролі не збігаються!');
    return;
  }

  const formData = new FormData();
  const photoFile = form['photo-upload'].files[0];

  formData.append('firstname', form.firstname.value);
  formData.append('lastname', form.lastname.value);
  formData.append('email', form.Email.value);
  formData.append('phoneNumber', form.phone.value);
  formData.append('country', form.country.value);
  formData.append('language', Array.from(document.querySelectorAll('input[name="lang[]"]:checked')).map(el => el.value).join(','));
  formData.append('specialties', selectedSpecializations.join(','));
  formData.append('skills', skills.join(','));
  formData.append('additionalInfo', form.description.value);
  formData.append('username', form.userName.value);
  formData.append('password', password);

  if (photoFile) {
    formData.append('photo', photoFile); // name = 'photo'
  }

  try {
    const response = await fetch('http://localhost:8000/api/user', {
      method: 'POST',
      body: formData, // без headers, бо FormData сам їх генерує
    });

    if (response.ok) {
      alert('Профіль успішно створено!');
    } else {
      alert('Помилка при створенні профілю!');
    }
  } catch (error) {
    console.error('Помилка запиту:', error);
    alert('Не вдалося підключитись до сервера.');
  }
};
  
  return (
    <>
      <MyHeader/>
      <section className='create-profile'>
        <div className="info">
          <h2 className='create-title'>Створити профіль</h2>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className='label-create-prof'>Прізвище</label>
              <input type="text" id="lastname" name="lastname" required className='input-info-create' />
            </div>
            <div className="form-group">
              <label htmlFor="name" className='label-create-prof'>Ім'я</label>
              <input type="text" id="firstname" name="firstname" required className='input-info-create' />
            </div>

            <div className="form-group">
  <label className="label-create-prof">Фото</label>

  {logoPreview && (
    <img
      id="logo-preview"
      src={logoPreview}
      alt="Logo Preview"
      style={{
        display: 'block',
        maxWidth: '100px',
        marginTop: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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
      style={{ display: 'none' }}
    />
  </div>
</div>
            <div className="form-group">
              <label htmlFor="Email" className='label-create-prof'>Email *</label>
              <input type="text" id="Email" name="Email" required className='input-info-create' />
              <label htmlFor="phone" className='label-create-prof'>Телефон</label>
              <input type="text" id="phone" name="phone" className='input-info-create'/>
              <label htmlFor="country" className='label-create-prof'>Країна *</label>
              <select id="country" name="country" required className='input-info-create'>
                <option value="">- Вибрати -</option>
                <option value="ua">Україна</option>
                <option value="uk">Велика Британія</option>
                <option value="other">Інше</option>
              </select>
            </div>

            <div className="form-group">
              <label className='label-create-prof'>Володіння мовами *</label>
              <div><input type="checkbox" id="ua " name="lang[]" value="ua" className='input-info-create check-create'/><label htmlFor="ua" className='label-create-prof'>Українська</label></div>
              <div><input type="checkbox" id="uk" name="lang[]" value="uk" className='input-info-create check-create'/><label htmlFor="uk" className='label-create-prof'>Англійська</label></div>
              <div><input type="checkbox" id="ch" name="lang[]" value="ch" className='input-info-create check-create'/><label htmlFor="ch" className='label-create-prof'>Китайська</label></div>
              <div><input type="checkbox" id="gr" name="lang[]" value="gr" className='input-info-create check-create'/><label htmlFor="gr" className='label-create-prof'>Німецька</label></div>
            </div>

            <div className="form-group">
              <label className='label-create-prof'>Вкажіть спеціальності:</label>
              <div className="tags">
                {['analize', 'marketing', 'web-prog', 'finance', 'designer', 'developer'].map(spec => (
                  <button
                    type="button"
                    className="tag"
                    id="formbtn"
                    key={spec}
                    onClick={() => toggleExperienceField(spec)}
                  >
                    {spec === 'analize' && 'Аналіз даних'}
                    {spec === 'marketing' && 'Маркетолог'}
                    {spec === 'web-prog' && 'Веб-розробник'}
                    {spec === 'finance' && 'Фінансист'}
                    {spec === 'designer' && 'Дизайнер'}
                    {spec === 'developer' && 'Розробник ПЗ'}
                  </button>
                ))}
              </div>
            </div>

            {['analize', 'marketing', 'web-prog', 'finance', 'designer', 'developer'].map(spec => (
              selectedSpecializations.includes(spec) && (
                <div className="form-group" id={`experience_${spec}`} key={spec}>
                  <label htmlFor={`experience-${spec}-input`} className='label-create-prof'>Досвід роботи "{spec === 'analize' ? 'Аналіз даних' : spec === 'marketing' ? 'Маркетолог' : spec === 'web-prog' ? 'Веб-розробник' : spec === 'finance' ? 'Фінансист' : spec === 'designer' ? 'Дизайнер' : 'Розробник ПЗ'}":</label>
                  <input type="text" id={`experience-${spec}-input`} name={`experience-${spec}`} className='input-info-create'/>
                </div>
              )
            ))}

            <button type="button" id="formbtnCl" onClick={clearSelection}>Очистити вибір</button>

            <div id="skills-container">
              <label htmlFor="skills" className='label-create-prof'>Скіли:</label>
              <div className="skills">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name="skills[]"
                      placeholder="Введіть скіл"
                      value={skill}
                      onChange={(e) => {
                        const updated = [...skills];
                        updated[index] = e.target.value;
                        setSkills(updated);
                      }}
                      className='input-info-create'
                    />
                    {skills.length > 1 && <button type="button" onClick={() => deleteSkill(index)} className='skill-button-create'>Видалити</button>}
                  </div>
                ))}
              </div>
              <br />
              <button type="button" id="formbtn" onClick={addSkill} className='skill-button-create'>Додати скіл</button>
              <br />
              <button type="button" id="formbtnCl" onClick={clearSkills}>Очистити всі скіли</button>
            </div>

            <br />
            <div className="form-group">
              <label htmlFor="description">Додаткова інформація</label>
              <textarea id="description" name="description" required className='input-info-create text'></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="password" className='label-create-prof'>Ім'я користувача *</label>
  <input
    type="twxt"
    id="userName"
    name="userName"
    required
    className='input-info-create'
  />
  <label htmlFor="password" className='label-create-prof'>Пароль *</label>
  <input
    type="password"
    id="password"
    name="password"
    required
    className='input-info-create'
  />

  <label htmlFor="confirmPassword" className='label-create-prof'>Підтвердіть пароль *</label>
  <input
    type="password"
    id="confirmPassword"
    name="confirmPassword"
    required
    className='input-info-create'
  />
</div>
            <button type="submit" id="formbtnS">Зберегти</button>
          </form>
        </div>
      </section>
          <MyFooter/>
    </>
  );
}
