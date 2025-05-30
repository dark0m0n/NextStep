import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/createProjCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
import { useNavigate, useParams } from "react-router-dom";

const specLabels = {
  analize: "Аналіз даних",
  marketing: "Маркетолог",
  "web-prog": "Веб-розробник",
  finance: "Фінансист",
  designer: "Дизайнер",
  developer: "Розробник ПЗ",
};

const EditStartupPage = () => {

  const [logoSrc, setLogoSrc] = useState("");
  const [visibleExperience, setVisibleExperience] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');
  const [customSpecName, setCustomSpecName] = useState('');
  const [customSpecExp, setCustomSpecExp] = useState('');
  const [customSpecVisible, setCustomSpecVisible] = useState(false);
  const [specClicked, setSpecClicked] = useState(false);
  const [showCategoryTip, setShowCategoryTip] = useState(false);
  const [customProjectType, setCustomProjectType] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [investment, setInvestment] = useState('');
  const [startup, setStartup] = useState(null);
  const [experienceValues, setExperienceValues] = useState({}); 
  const [hiring, setHiring] = useState(true);



  const categoryRef = useRef(null);
  const projTypeRef = useRef(null);
  const specRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/startup/${id}`, {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error(`Помилка завантаження стартапу: ${response.status}`);
        }
        const startupD = await response.json();
        console.log("Loaded startup:", startupD);
  
        setStartup(startupD);
  
        if (startupD?.imagePath) {
          setLogoSrc(startupD.imagePath);
        }
  
        if (startupD?.category) {
          const initialCategories = startupD.category
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean);
          setCategories(initialCategories);
        }
  
        const predefinedTypes = ["Стартап", "Малий бізнес", "Пілотний проєкт", "MVP"];
  
        if (startupD?.projectType) {
          if (predefinedTypes.includes(startupD.projectType)) {
            setSelectedProjectType(startupD.projectType);
          } else {
            setSelectedProjectType("Інше");
            setCustomProjectType(startupD.projectType);
          }
        }
  
        if (startupD?.investment) {
          const formattedInvestment = startupD.investment
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          setInvestment(formattedInvestment);
        }
  
        if (startupD?.experience) {
          const experienceItems = startupD.experience.split(",").map(item => item.trim());
          const visibilityMap = {};
          const expValues = {};
  
          experienceItems.forEach(entry => {
            const [label, val] = entry.split(":").map(p => p.trim());
            const key = Object.keys(specLabels).find(k => specLabels[k] === label);
            if (key) {
              visibilityMap[key] = true;
              expValues[key] = val || "";
            } else {
              setCustomSpecVisible(true);
              setCustomSpecName(label);
              setCustomSpecExp(val || "");
            }
          });
  
          setVisibleExperience(visibilityMap);
          setExperienceValues(expValues);
        }
  
        if (typeof startupD.hiring === 'boolean') {
          setHiring(startupD.hiring);
        } else {
          setHiring(true);
        }
  
      } catch (err) {
        console.error("Помилка при завантаженні userData:", err);
      }
    };
  
    fetchStartup();
  }, [id]);
  
  if (!startup) return <div>Завантаження...</div>;

  const previewLogo = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setLogoSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleInvestmentChange = (e) => {
    let rawValue = e.target.value.replace(/\s/g, '');
    if (!/^\d*$/.test(rawValue)) return;
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setInvestment(formatted);
  };
  

  const handleAddCategory = () => {
    const categoryToAdd = selectedCategory === "Інше" ? customCategory.trim() : selectedCategory;

    if (categoryToAdd && !categories.includes(categoryToAdd)) {
      setCategories([...categories, categoryToAdd]);
      setCustomCategory('');
      setSelectedCategory('');
      setShowCategoryTip(true);
    }

    if (categoryRef.current) categoryRef.current.style.borderColor = '#ccc';
    const errorEl = document.getElementById('wrongCategory');
    if (errorEl) errorEl.style.display = 'none';
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
    };

  const toggleExperienceField = (specialization) => {
    setSpecClicked(true); 
    setVisibleExperience((prev) => ({
      ...prev,
      [specialization]: !prev[specialization],
    }));
    const errorEl = document.getElementById('wrongSpec');
    if (errorEl) errorEl.style.display = 'none';
  };

  const handleExperienceChange = (specId, value) => {
    setExperienceValues(prev => ({
      ...prev,
      [specId]: value,
    }));
  };

  const clearSelection = () => {
    setVisibleExperience({});
    setCustomSpecVisible(false);
    setCustomSpecName('');
    setCustomSpecExp('');
    setSpecClicked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSpecs = Object.values(visibleExperience).some(v => v);
    if (!selectedSpecs) {
      document.getElementById('wrongSpec').style.display = 'block';
      specRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    } else {
      document.getElementById('wrongSpec').style.display = 'none';
    }

    if ((selectedProjectType === "Інше" && customProjectType.trim() === "") || selectedProjectType === "") {
      projTypeRef.current.style.borderColor = 'red';
      document.getElementById('wrongProjectType').style.display = 'block';
      setTimeout(() => {
        projTypeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    } else {
      projTypeRef.current.style.borderColor = '#ccc';
      document.getElementById('wrongProjectType').style.display = 'none';
    }

    if (categories.length === 0) {
      categoryRef.current.style.borderColor = 'red';
      document.getElementById('wrongCategory').style.display = 'block';
      categoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    } else {
      categoryRef.current.style.borderColor = '#ccc';
      document.getElementById('wrongCategory').style.display = 'none';
    }

    const formData = new FormData(e.target);

    const fileInput = document.getElementById("photo-upload");
    if (fileInput && fileInput.files.length > 0) {
      formData.append("photo", fileInput.files[0]);
    }

    let experienceString = "";

    Object.entries(visibleExperience).forEach(([specId, visible]) => {
      if (visible) {
        const exp = document.getElementById(`experience-${specId}-input`);
        if (exp) {
          const value = exp.value?.trim() || "0";
          const label = specLabels[specId] || specId;
          experienceString += `${label}: ${value}, `;
        }
      }
    });

    if (customSpecVisible && customSpecName.trim()) {
      const name = customSpecName.trim();
      const exp = customSpecExp.trim() || "0";
      experienceString += `${name}: ${exp}, `;
    }

    if (experienceString.endsWith(", ")) {
      experienceString = experienceString.slice(0, -2);
    }

    formData.append("experience", experienceString);
    formData.append("title", formData.get("startup-name"));
    formData.append("description", formData.get("description"));
    formData.append("projectType", selectedProjectType === "Інше" ? customProjectType.trim() : selectedProjectType);
    formData.append("hiring", hiring);

    const categoriesString = categories.join(", ");
    formData.append("category", categoriesString);

    let invest = formData.get("investment");
    if (!invest || invest.trim() === "") invest = "0";
    formData.set("investment", invest);

    try {
      const response = await fetch("http://localhost:8000/api/startup", {
        method: "PUT",
        body: formData,
        credentials: "include"
      });

      if (response.ok) {
        console.log("Стартап створено успішно!");
      } else {
        const err = await response.text();
        console.log("Помилка: " + err);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      console.log("Помилка при з'єднанні з сервером.");
    }
  };

  return (
    <>
      <MyHeader />
      <section className="create-project">
        <div className="info">
          <h2 className="create-title">Створи свій Стартап</h2>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            {/* Назва */}
            <div className="form-group-create-proj">
              <label htmlFor="startup-name" className="label-create-proj">
                Назва стартапу <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="startup-name"
                name="startup-name"
                required
                className="input-info-create"
                placeholder="Введіть назву стартапу"
                defaultValue={startup.title}
              />
            </div>

            {/* Фото */}
            <div className="form-group-create-proj">
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

            {/* Опис */}
            <div className="form-group-create-proj">
              <label htmlFor="description" className="label-create-proj">
                Опис <span className="required-star">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                className="input-info-create-proj text"
                placeholder="Опишіть ваш стартап"
                defaultValue={startup.description}
              />
            </div>

            {/* Категорія */}
            <div className="form-group-create-proj">
              <label htmlFor="category" className="label-create-proj">
                Категорія <span className="required-star">*</span>
                {showCategoryTip && (
                  <span className="tip">Натиснути на назву для видалення</span>
                )}
              </label>
              <p id="wrongCategory" style={{ color: "red", display: "none", fontStyle: "italic", marginLeft: "10px" }}>
                Додайте принаймні одну категорію
              </p>
              <div className="category-list">
                {categories.length === 0 ? (
                  <p className="category-item">Для стартапу ще немає визначених категорій</p>
                ) : (
                  <div className="category-item">
                    {categories.map((category) => (
                      <span
                        key={category}
                        onClick={() => handleRemoveCategory(category)}
                        style={{ cursor: "pointer" }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="category-input">
                <select
                  id="category"
                  name="category"
                  className="input-info-create-proj"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  ref={categoryRef}
                >
                  <option value="">-Вибрати-</option>
                  <option value="IT">IT</option>
                  <option value="Виробництво">Виробництво</option>
                  <option value="Інновації">Інновації</option>
                  <option value="Технології">Технології</option>
                  <option value="Інше">Інше</option>
                </select>
                {selectedCategory === "Інше" && (
                  <input
                    type="text"
                    placeholder="Введіть свою категорію"
                    className="input-info-create-proj"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                  />
                )}
                <button type="button" onClick={handleAddCategory} className="tag">
                  Додати
                </button>
              </div>
            </div>

                        {/* Тип проєкту */}
                        <div className="form-group-create-proj">
              <label htmlFor="projectType" className="label-create-proj">
                Тип проєкту <span className="required-star">*</span>
              </label>
              <p id="wrongProjectType" style={{ color: "red", display: "none", fontStyle: "italic", marginLeft: "10px" }}>
                Виберіть тип проєкту
              </p>
              <div className="category-input">
                <select
                  id="projectType"
                  name="projectType"
                  className="input-info-create-proj"
                  value={selectedProjectType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedProjectType(value);
                    if (value !== "Інше") {
                      setCustomProjectType("");  // очищаємо поле при зміні
                    }
                  }}
                  ref={projTypeRef}
                >
                  <option value="Стартап">Стартап</option>
                  <option value="Малий бізнес">Малий бізнес</option>
                  <option value="Пілотний проєкт">Пілотний проєкт</option>
                  <option value="MVP">MVP</option>
                  <option value="Інше">Інше</option>
                </select>
                {selectedProjectType === "Інше" && (
                  <input
                    type="text"
                    placeholder="Введіть свою категорію"
                    className="input-info-create-proj"
                    value={customProjectType}
                    onChange={(e) => setCustomProjectType(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Інвестиції */}
            <div className="form-group-create-proj">
  <label htmlFor="investment" className="label-create-proj">Необхідні інвестиції</label>
  <div className="investment-input-wrapper">
    <input
      type="text"
      id="investment"
      name="investment"
      className="input-info-create-proj investment-input"
      placeholder="Наприклад 2000"
      value={investment}
      onChange={handleInvestmentChange}
    />
    <div className="currency-label">грн</div>
  </div>
</div>

            {/* Спеціальності */}
            <div className="form-group-create-proj">
              <label htmlFor="specializations" className="label-create-proj">
                Вкажіть необхідні спеціальності: <span className="required-star">*</span>
                              {(customSpecVisible || Object.values(visibleExperience).some(Boolean)) && (
                                  <span className="tip">Натиснути ПОВТОРНО на назву для видалення</span>
                              )}
              </label>

              <p id="wrongSpec" style={{ color: "red", display: "none", fontStyle: "italic", marginLeft: "10px" }}>
                Додайте принаймні одну спеціальність для команди
              </p>
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
                    ref={specRef}
                  >
                    {spec.label}
                  </button>
                ))}
                <button
                  type="button"
                  className="tag"
                  id="formbtn"
                  onClick={() => {
                    setCustomSpecVisible((prev) => {
                      const newState = !prev;
                      if (!newState) {
                        // Якщо приховали поля — очистити значення
                        setCustomSpecName('');
                        setCustomSpecExp('');
                      }
                      return newState;
                    });

                    const errorEl = document.getElementById('wrongSpec');
                    if (errorEl) errorEl.style.display = 'none';
                  }}
                >
                  Інше
                </button>
              </div>
            </div>

            {/* Поля досвіду */}
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
                  <div className="form-group-create-proj" key={spec.id}>
                    <label htmlFor={`experience-${spec.id}-input`} className="label-create-proj">
                      Досвід роботи "{spec.label}":
                    </label>
                    <input
                      type="text"
                      id={`experience-${spec.id}-input`}
                      name={`experience-${spec.id}`}
                      className="input-info-create-proj"
                      placeholder="Введіть необхідний досвід роботи"
                      value={experienceValues[spec.id] || ""}
                      onChange={(e) => handleExperienceChange(spec.id, e.target.value)}
                    />
                  </div>
                )
            )}

            {/* Кастомна спеціальність */}
            {customSpecVisible && (
              <>
                <div className="form-group-create-proj">
                  <label className="label-create-proj">Назва спеціальності:</label>
                  <input
                    type="text"
                    className="input-info-create-proj"
                    placeholder="Введіть назву спеціальності"
                    value={customSpecName}
                    onChange={(e) => setCustomSpecName(e.target.value)}
                  />
                </div>
                <div className="form-group-create-proj">
                  <label className="label-create-proj">Досвід роботи:</label>
                  <input
                    type="text"
                    className="input-info-create-proj"
                    placeholder="Введіть досвід роботи"
                    value={customSpecExp}
                    onChange={(e) => setCustomSpecExp(e.target.value)}
                  />
                </div>
              </>
            )}
            {/*Hiring*/}
            <div className="form-group-create-proj check-hiring">
              <input type="checkbox"
                className="check-create"
                checked={hiring}
              onChange={(e) => setHiring(e.target.checked)}/>
              <label className="label-create-proj check-hiring-label">Набір персоналу ще відкритий</label>
            </div>

            {/* Кнопки */}
            <button type="button" id="formbtnCl" onClick={clearSelection}>
              Очистити вибір
            </button>
            <br />
            <button type="submit" id="formbtnS" onClick={() => navigate(`/project/${startup.id}`)}>
              Зберегти
            </button>
          </form>
        </div>
      </section>
      <MyFooter />
    </>
  );
};

export default EditStartupPage;
