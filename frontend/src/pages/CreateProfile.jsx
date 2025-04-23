import React, { useState } from 'react';
import '../assets/styles/createProfileCSS.css'; 
import '../App.css';

export default function CreateProfile() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [smenuVisible, setSmenuVisible] = useState(false);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [skills, setSkills] = useState(['']);

  const toggleVisibility = () => setSmenuVisible(prev => !prev);
  const toggleSearchField = () => setSearchVisible(prev => !prev);

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

  const submitSearch = () => {
    const query = document.getElementById('search-input').value;
    if (query) {
      console.log('Пошук за запитом:', query);
    } else {
      alert('Будь ласка, введіть запит для пошуку.');
    }
  };

  const addSkill = () => setSkills([...skills, '']);

  const deleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const clearSkills = () => setSkills(['']);

  return (
    <>
      <noscript>У Вас вимкнений або відсутній JavaScript для браузера!</noscript>
      <header>
        <div className="nav-container">
          <a href="/"><img className="logo" src="images/logo3_w.png" alt="Logo" /></a>
          {searchVisible && (
            <div id="search-container">
              <input type="text" id="search-input" placeholder="Введіть запит для пошуку..." />
              <button id="search-submit" onClick={submitSearch}>Знайти</button>
            </div>
          )}
          <nav>
            <button className="button" onClick={toggleSearchField}>Пошук</button>
            <button className="button" onClick={toggleVisibility}>Стартапи</button>
            <button className="button">Чати</button>
            <a href="/log"><button className="button">Профіль</button></a>
          </nav>
        </div>
        {smenuVisible && (
          <div id="smenu">
            <a href="/searchproj" className="smenu" id="one">Знайти стартап</a>
            <a href="/searchemp" className="smenu" id="one">Знайти персонал</a>
            <a href="/createproj" className="smenu" id="two">Створити стартап</a>
          </div>
        )}
      </header>

      <section className='create-profile'>
        <div className="info">
          <h2 className='create-title'>Створити профіль</h2>
        </div>
        <div className="container">
          <form action="#" method="POST">
            <div className="form-group">
              <label htmlFor="name" className='label-create-prof'>ПІБ *</label>
              <input type="text" id="name" name="name" required className='input-info-create' />
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
            <button type="submit" id="formbtnS">Зберегти</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p><a href="mailto:support@next.step">support@next.step</a></p>
          <p>м. Львів, вул. Степана Бандери 12, Україна</p>
          <div className="footer-icons">
          <a href=""><img src="/images/insta.png" alt="Instagram"/></a>
              <a href=""><img src="/images/fb.png" alt="Facebook"/></a>
              <a href=""><img src="/images/yt.png" alt="YouTube"/></a>
          </div>
          <div className="footer-links">
            <a href="#">Умови та положення</a>
            <a href="#">Політика конфіденційності</a>
          </div>
        </div>
      </footer>
    </>
  );
}
