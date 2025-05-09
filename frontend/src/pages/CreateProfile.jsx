import React, { useState, useRef} from 'react';
import '../assets/styles/createProfileCSS.css'; 
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";


export default function CreateProfile() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [skills, setSkills] = useState(['']);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [skillErrors, setSkillErrors] = useState([]);

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

  const addSkill = () => {
    const errors = skills.map(skill => skill.trim() === '');

    const hasEmpty = errors.includes(true);
    if (hasEmpty) {
      setSkillErrors(errors);
    } else {
      setSkills([...skills, '']);
      setSkillErrors([...errors, false]);
    }
  };

  const deleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const clearSkills = () => setSkills(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    document.getElementById('wrongPshort').style.display = 'none';
    document.getElementById('wrongPneq').style.display = 'none';
    form.password.style.borderColor = '#ccc';
    form.confirmPassword.style.borderColor = '#ccc';
    
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

     if (password.length < 8) {
        form.password.style.borderColor = 'red';
       document.getElementById('wrongPshort').style.display = 'block';
       passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
     } else {
        form.password.style.borderColor = '#ccc';
        document.getElementById('wrongPshort').style.display = 'none';  
     }

    if (password !== confirmPassword) {
      form.confirmPassword.style.borderColor = 'red';
      document.getElementById('wrongPneq').style.display = 'block';
      confirmPasswordRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    } else {
      form.confirmPassword.style.borderColor = '#ccc';
      document.getElementById('wrongPneq').style.display = 'none'; 
    }
    const formData = new FormData();
    const photoFile = form['photo-upload'].files[0];
    const cleanedSkills = skills.map(s => s.trim()).filter(s => s !== '');

    formData.append('firstname', form.firstname.value);
    formData.append('lastname', form.lastname.value);
    formData.append('email', form.Email.value);
    formData.append('phoneNumber', form.phone.value);
    formData.append('country', form.country.value);
    formData.append('language', Array.from(document.querySelectorAll('input[name="lang[]"]:checked')).map(el => el.value).join(','));
    formData.append('specialties', selectedSpecializations.join(','));
    formData.append('skills', JSON.stringify(cleanedSkills));
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
        console.log('Профіль створено успішно.');
      } else {
        console.log('Помилка при створенні профілю.');
      }
    } catch (error) {
      console.error('Помилка запиту:', error);
      console.log('Не вдалося підлючитися до серверу.');
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
              <label htmlFor="password" className='label'>Ім'я користувача *</label>
              <input
                type="twxt"
                id="userName"
                name="userName"
                required
                className='input-info-create'
                placeholder="Введіть ім'я користувача"
              />
              <label htmlFor="password" className='label'>Пароль *</label>
              <p id="wrongPshort">Пароль повинен бути більше 8-ми символів</p>
              <input
                type="password"
                id="password"
                name="password"
                required
                className='input-info-create'
                placeholder="Введіть пароль"
                ref={passwordRef}
              />
              <label htmlFor="confirmPassword" className='label'>Підтвердіть пароль *</label>
              <p id="wrongPneq">Паролі повинні бути однаковими</p>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className='input-info-create'
                placeholder="Підтвердіть пароль"
                ref={confirmPasswordRef}
              />
              <label htmlFor="Email" className='label'>Email *</label>
              <input
                type="text"
                id="Email"
                name="Email"
                required
                className='input-info-create'
                placeholder="Введіть ел. пошту"
              />
              <label htmlFor="country" className='label'>Країна *</label>
              <select id="country" name="country" required className='input-info-create'>
                <option value="">- Вибрати -</option>
                <option value="ua">Україна</option>
                <option value="uk">Велика Британія</option>
                <option value="other">Інше</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label">Фото</label>
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
              <label htmlFor="name" className='label'>Прізвище</label>
              <input type="text" id="lastname" name="lastname" className='input-info-create' placeholder="Введіть прізвище"/>
              <label htmlFor="name" className='label'>Ім'я</label>
              <input type="text" id="firstname" name="firstname" className='input-info-create' placeholder="Введіть ім'я"/>
              <label htmlFor="phone" className='label'>Телефон</label>
              <input type="text" id="phone" name="phone" className='input-info-create' pattern="[0-9]{10}" placeholder="Введіть номер телефону"/>
            </div>
            <div className="form-group">
              <label className='label'>Володіння мовами</label>
              <div><label htmlFor="ua" className='label-create-prof'>Українська</label><input type="checkbox" id="ua " name="lang[]" value="ua" className='input-info-create check-create' /></div>
              <div><label htmlFor="uk" className='label-create-prof'>Англійська</label><input type="checkbox" id="uk" name="lang[]" value="uk" className='input-info-create check-create' /></div>
              <div><label htmlFor="ch" className='label-create-prof'>Китайська</label><input type="checkbox" id="ch" name="lang[]" value="ch" className='input-info-create check-create' /></div>
              <div><label htmlFor="gr" className='label-create-prof'>Німецька</label><input type="checkbox" id="gr" name="lang[]" value="gr" className='input-info-create check-create' /></div>
            </div>
            <div className="form-group">
              <label className='label'>Вкажіть спеціальності:</label>
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
                  <label htmlFor={`experience-${spec}-input`} className='label'>Досвід роботи "{spec === 'analize' ? 'Аналіз даних' : spec === 'marketing' ? 'Маркетолог' : spec === 'web-prog' ? 'Веб-розробник' : spec === 'finance' ? 'Фінансист' : spec === 'designer' ? 'Дизайнер' : 'Розробник ПЗ'}":</label>
                  <input type="text" id={`experience-${spec}-input`} name={`experience-${spec}`} className='input-info-create' placeholder="Введіть інформацію про потрібний досвід роботи"/>
                </div>
              )
            ))}
            <button type="button" id="formbtnCl" onClick={clearSelection}>Очистити вибір</button>
            <br></br>
            <div id="skills-container">
              <label htmlFor="skills" className='label'>Скіли:</label>
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

                        const upgradedErrors = [...skillErrors];
                        upgradedErrors[index] = false;
                        setSkillErrors(upgradedErrors);
                      }}
                      className={`input4skills ${skillErrors[index] ? 'input-error' : ''}`}
                    />
                    {skillErrors[index] && (
                      <p className="error-message">Заповніть це поле перед додаванням нового</p>
                    )}
                    {skills.length > 1 && <button type="button" onClick={() => deleteSkill(index)} className='skill-button-del'>Видалити</button>}
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
              <label htmlFor="description" className="label">Додаткова інформація</label>
              <textarea id="description" name="description" className='input-info-create text' placeholder="Введіть додаткову інформацію"></textarea>
            </div>
            <button type="submit" id="formbtnS">Зберегти</button>
          </form>
        </div>
      </section>
          <MyFooter/>
    </>
  );
}
