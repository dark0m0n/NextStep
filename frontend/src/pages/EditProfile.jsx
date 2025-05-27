import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/createProfileCSS.css';

import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
import PhoneInputForm from '../components/PhoneMask.jsx';

export default function CreateProfile() {
    const navigate = useNavigate();

  // State variables
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [skills, setSkills] = useState(['']);
  const [skillErrors, setSkillErrors] = useState([]);
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');
  const [specializationsWithExp, setSpecializationsWithExp] = useState({});
  const [customSpecVisible, setCustomSpecVisible] = useState(false);
  const [customSpecName, setCustomSpecName] = useState('');
  const [customSpecExp, setCustomSpecExp] = useState('');
  const [customSpecNameError, setCustomSpecNameError] = useState('');
  const [customSpecExpError, setCustomSpecExpError] = useState('');
  const [userData, setUserData] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [skillInvalidChars, setSkillInvalidChars] = useState(Array(skills.length).fill(false));

    const languages = [
      { id: 'Українська', label: 'Українська' },
      { id: 'Англійська', label: 'Англійська' },
        { id: "Китайська", label: "Китайська" },
        { id: 'Німецька', label: 'Німецька' },
    ];
    useEffect(() => {
  fetch("http://localhost:8000/api/me", {
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) {
        navigate("/login");
        return null;
      }
      if (!res.ok) throw new Error("Не вдалося завантажити профіль");
      return res.json();
    })
    .then((user) => {
      if (!user) return;
      setUserData(user);

      if (user.imagePath) {
        setLogoPreview(user.imagePath);
      }

      if (user.language) {
        const langs = user.language.split(',').map(lang => lang.trim());
        setSelectedLanguages(langs);
      }

      if (user.skills) {
        const parsedSkills = user.skills.split(';').map(skill => skill.trim());
        setSkills(parsedSkills.length ? parsedSkills : ['']);
        setSkillErrors(parsedSkills.map(() => false));
        setSkillInvalidChars(parsedSkills.map(() => false));
      }

      if (user.specialties) {
        const specsObj = {};
        const specsArr = user.specialties.split(',').map(spec => spec.trim());
        specsArr.forEach(pair => {
          const [name, exp] = pair.split(':').map(str => str.trim());
          if (name && exp) {
            specsObj[name] = exp;
          }
        });

        setSpecializationsWithExp(specsObj);
      }

    })
    .catch((err) => console.error("Помилка завантаження:", err));
}, [navigate]);

  
    if (!userData)return <div>Завантаження...</div>;

  // Handlers
  const previewLogo = (e) => {
      const file = e.target.files[0];
      setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target.result);
    reader.readAsDataURL(file);
    };
    
    const toggleLanguage = (langID) => {
        setSelectedLanguages(prev => 
        prev.includes(langID)?prev.filter(lang => lang !== langID):[...prev, langID]);
     };

  const toggleExperienceField = (spec) => {
    if (spec === 'custom') {
      setCustomSpecVisible(prev => {
        if (prev) {
          setCustomSpecName('');
          setCustomSpecExp('');
          setSpecializationsWithExp(prevSpecs => {
            const copy = { ...prevSpecs };
            delete copy['custom'];
            return copy;
          });
        }
        return !prev;
      });
    } else {
      setSpecializationsWithExp(prev => {
        const updated = { ...prev };
        if (Object.prototype.hasOwnProperty.call(updated, spec)) {
          delete updated[spec];
        } else {
          updated[spec] = ''; // Показати поле для введення
        }
        return updated;
      });
    }
  };
  
  const addCustomSpecialization = () => {
    let hasError = false;

  if (!customSpecName.trim()) {
    setCustomSpecNameError('Це поле потрібно заповнити');
    hasError = true;
  } else {
    setCustomSpecNameError('');
  }

  if (!customSpecExp.trim()) {
    setCustomSpecExpError('Це поле потрібно заповнити');
    hasError = true;
  } else {
    setCustomSpecExpError('');
  }

  if (hasError) return;
  setSpecializationsWithExp(prev => ({
    ...prev,
    [customSpecName.trim()]: customSpecExp.trim(),
  }));

  setCustomSpecName('');
  setCustomSpecExp('');
  setCustomSpecVisible(false);
  };

  const handleExperienceChange = (spec, value) => {
    setSpecializationsWithExp(prev => ({
      ...prev,
      [spec]: value,
    }));
  };

  const clearSpecializations = () => {
    setSpecializationsWithExp({});
    setCustomSpecVisible(false);
    setCustomSpecName('');
    setCustomSpecExp('');
  };

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
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const clearSkills = () => setSkills(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const wrongEmailElem = document.getElementById('wrongEmail');
    if (wrongEmailElem) wrongEmailElem.style.display = 'none';
    form.Email.style.borderColor = '#ccc';

    const cleanedSkills = skills.map(s => s.trim()).filter(s => s !== '' && !s.includes(';'));
    const email = form.Email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const skillsString = cleanedSkills.join(';');
    const specialtiesWithExpArr = Object.entries(specializationsWithExp).map(
      ([spec, exp]) => `${spec}: ${exp.trim()}`
    );

    if (!emailRegex.test(email)) {
      form.Email.style.borderColor = 'red';
      document.getElementById('wrongEmail').style.display = 'block';
      form.Email.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // Prepare form data
    const formData = new FormData();
    const photoFile = form['photo-upload'].files[0];

    formData.append('firstname', form.firstname.value);
    formData.append('lastname', form.lastname.value);
    formData.append('email', email);
    formData.append('phoneNumber', fullPhoneNumber);
    formData.append('country', form.country.value);
    formData.append('language', selectedLanguages.join(','));
    formData.append('specialties', specialtiesWithExpArr.join(', '));
    formData.append('skills', skillsString);
    formData.append('additionalInfo', form.description.value);
    formData.append('username', form.userName.value);

    if (logoFile) {
      formData.append('photo', logoFile);
    }

    // Submit data
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'PUT',
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        console.log('Профіль створено успішно.');
        const data = await response.json();
        navigate(`/profile/${data.username}`);
      } else {
        console.log('Помилка при створенні профілю.');
      }
    } catch (error) {
      console.error('Помилка запиту:', error);
      console.log('Не вдалося підключитися до серверу.');
    }
  };
  
  return (
    <>
      <MyHeader />
      <section className="create-profile">
        <div className="info">
          <h2 className="create-title">Створити профіль</h2>
        </div>
  
        <div className="container">
          <form onSubmit={handleSubmit}>
  
            {/* Основна інформація */}
            <div className="form-group">
              <label htmlFor="username" className="label">
                Ім'я користувача <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                required
                className="input-info-create"
                              placeholder="Введіть ім'я користувача"
                defaultValue={userData.username}
              />
  
              <label htmlFor="Email" className="label">
                Email <span className="required-star">*</span>
              </label>
              <p id="wrongEmail">Некоректна електронна пошта</p>
              <input
                type="text"
                id="Email"
                name="Email"
                required
                className="input-info-create"
                              placeholder="Введіть ел. пошту"
                defaultValue={userData.email}
              />
  
              <label htmlFor="country" className="label">
                Країна <span className="required-star">*</span>
              </label>
              <select id="country" name="country" required className="input-info-create" defaultValue={userData.country}>
                <option value="ua">Україна</option>
                <option value="uk">Велика Британія</option>
                <option value="other">Інше</option>
              </select>
            </div>
  
            {/* Фото */}
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
  
            {/* Персональні дані */}
            <div className="form-group">
              <label htmlFor="lastname" className="label">Прізвище</label>
                          <input type="text"
                              id="lastname"
                              name="lastname"
                              className="input-info-create"
                              placeholder="Введіть прізвище"
                                defaultValue={userData.lastname}
                          />
  
              <label htmlFor="firstname" className="label">Ім'я</label>
                          <input type="text" id="firstname" name="firstname" className="input-info-create" placeholder="Введіть ім'я"
                                defaultValue={userData.firstname}
                          />
  
                          <PhoneInputForm onPhoneChange={setFullPhoneNumber} initialPhone={userData.phoneNumber} />
            </div>
  
            {/* Мови */}
            <div className="language-options">
              <label className="label">Володіння мовами</label>
              {languages.map(lang => (
                <div key={lang.id}>
                      <input type="checkbox"
                          id={lang.id}
                          name="lang[]"
                          value={lang.id}
                          className="check-create"
                          checked={selectedLanguages.includes(lang.id)}
                            onChange={() => toggleLanguage(lang.id)}
                      />
                      <label htmlFor={lang.id} className="labelCheckBox">{lang.label}</label>
                </div>
              ))}
            </div>
  
            {/* Спеціальності */}
            <div className="form-group">
              <label className="label">Вкажіть спеціальності:</label>
              <div className="tags">
                {['analize', 'marketing', 'web-prog', 'finance', 'designer', 'developer'].map(spec => (
                  <button
                    type="button"
                    className="tag"
                    id="formbtn"
                    key={spec}
                    onClick={() => toggleExperienceField(spec)}
                  >
                    {{
                      analize: 'Аналіз даних',
                      marketing: 'Маркетолог',
                      'web-prog': 'Веб-розробник',
                      finance: 'Фінансист',
                      designer: 'Дизайнер',
                      developer: 'Розробник ПЗ'
                    }[spec]}
                  </button>
                ))}
                <button
                  type="button"
                  className={`tag ${customSpecVisible ? 'selected' : ''}`}
                  id="formbtn"
                  onClick={() => toggleExperienceField('custom')}
                >
                  Інше
                </button>
              </div>
            </div>
  
            {/* Досвід для спеціальностей */}
            {Object.entries(specializationsWithExp).map(([spec, experience]) => (
              <div className="form-group" key={spec}>
                <label className="label">
                  Досвід для "{{
                    analize: 'Аналіз даних',
                    marketing: 'Маркетолог',
                    'web-prog': 'Веб-розробник',
                    finance: 'Фінансист',
                    designer: 'Дизайнер',
                    developer: 'Розробник ПЗ'
                  }[spec] || spec}":
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => handleExperienceChange(spec, e.target.value)}
                  className="input-info-create"
                  placeholder="Введіть досвід"
                />
                {!['analize', 'marketing', 'web-prog', 'finance', 'designer', 'developer'].includes(spec) && (
      <button
        type="button"
        className="skill-button-del"
                    style={{ marginTop: '5px' }}
        onClick={() => {
          setSpecializationsWithExp(prev => {
            const updated = { ...prev };
            delete updated[spec];
            return updated;
          });
        }}
      >
        Видалити
      </button>
    )}
              </div>
            ))}
  
            {/* Користувацька спеціальність */}
            {customSpecVisible && (
              <div className="form-group">
                <label className="label">Спеціальність:</label>
                {customSpecNameError && <div className="error-message">{customSpecNameError}</div>}
                <input
                  type="text"
                  value={customSpecName}
                  onChange={(e) => setCustomSpecName(e.target.value)}
                  className="input-info-create"
                  placeholder="Введіть спеціальність"
                />
                <label className="label">Досвід:</label>
                {customSpecExpError && <div className="error-message">{customSpecExpError}</div>}
                <input
                  type="text"
                  value={customSpecExp}
                  onChange={(e) => setCustomSpecExp(e.target.value)}
                  className="input-info-create"
                  placeholder="Введіть досвід"
                />
                <button type="button" id="formbtn" onClick={addCustomSpecialization} className="skill-button-create">Додати</button>
              </div>
            )}
  
            <button type="button" id="formbtnCl" onClick={clearSpecializations} >Очистити вибір</button>
  
            {/* Скіли */}
            <div id="skills-container">
              <label htmlFor="skills" className="label">Скіли:</label>
              <div className="skills">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name="skills[]"
                      placeholder="Введіть скіл"
                      value={skill}
                      onChange={(e) => {
                        const value = e.target.value;
  const updatedInvalids = [...skillInvalidChars];
  updatedInvalids[index] = /;/.test(value);
  setSkillInvalidChars(updatedInvalids);

  if (/;/.test(value)) return;
                        const updated = [...skills];
                        updated[index] = e.target.value;
                        setSkills(updated);
                        const updatedErrors = [...skillErrors];
                        updatedErrors[index] = false;
                        setSkillErrors(updatedErrors);
                      }}
                      className={`input4skills ${skillErrors[index] ? 'input-error' : ''}`}
                    />
                    {skillErrors[index] && <p className="error-message">Заповніть це поле перед додаванням нового</p>}
                    {skills.length > 1 && (index !== skills.length - 1 || skill.trim() !== '') && (
                      <button type="button" onClick={() => deleteSkill(index)} className="skill-button-del">
                        Видалити
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" id="formbtn" onClick={addSkill} className="skill-button-create">Додати скіл</button>
              <button type="button" id="formbtnCl" onClick={clearSkills}>Очистити всі скіли</button>
            </div>
  
            {/* Додаткова інформація */}
            <div className="form-group">
              <label htmlFor="description" className="label">Додаткова інформація</label>
              <textarea
                id="description"
                name="description"
                className="input-info-create text"
                              placeholder="Введіть додаткову інформацію"
                defaultValue={userData.additionalInfo}
              ></textarea>
            </div>
  
            <button type="submit" id="formbtnS">Зберегти</button>
          </form>
        </div>
      </section>
      <MyFooter />
    </>
  );
}  