import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/createProjCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
import { useParams } from "react-router-dom";

const CreateStartupPage = () => {
    const { id } = useParams();
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
    const [Data, setData] = useState({});
    const [initialProjectData, setInitialProjectData] = useState({});

  const categoryRef = useRef(null);
  const projTypeRef = useRef(null);
  const specRef = useRef(null);

  const specLabels = {
    analize: "Аналіз даних",
    marketing: "Маркетолог",
    "web-prog": "Веб-розробник",
    finance: "Фінансист",
    designer: "Дизайнер",
    developer: "Розробник ПЗ",
  };

  const previewLogo = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setLogoSrc(e.target.result);
    reader.readAsDataURL(file);
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
    setShowCategoryTip(false);
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

  const clearSelection = () => {
    setVisibleExperience({});
    setCustomSpecVisible(false);
    setCustomSpecName('');
    setCustomSpecExp('');
    setSpecClicked(false);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/user/me`)
      .then((res) => {
        if (!res.ok) throw new Error("Profile load error");
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Помилка:", error));
      fetch(`http://localhost:8000/api/startup/${id}`)
      .then((res) => {
          if (!res.ok) throw new Error("Project load error");
          return res.json();
      })
      .then((data) => {
          setInitialProjectData(data);
          setLogoSrc(data.imagePath);
          setSelectedProjectType(data.projectType);
          setCustomProjectType(data.projectType === "Інше" ? data.customProjectType : '');
          setCategories(data.category.split(", ").filter(cat => cat !== ""));
          setCustomCategory(data.category.includes("Інше") ? data.category.split(", ").find(cat => cat !== "Інше") : '');
          setVisibleExperience({
              analize: data.experience.includes("Аналіз даних"),
              marketing: data.experience.includes("Маркетолог"),
              "web-prog": data.experience.includes("Веб-розробник"),
              finance: data.experience.includes("Фінансист"),
              designer: data.experience.includes("Дизайнер"),
              developer: data.experience.includes("Розробник ПЗ"),
          });
          setCustomSpecVisible(data.experience.includes("Інше"));
          if (data.experience.includes("Інше")) {
              const customSpec = data.experience.split(", ").find(spec => !Object.values(specLabels).includes(spec));
              if (customSpec) {
                  const [name, exp] = customSpec.split(": ");
                  setCustomSpecName(name.trim());
                  setCustomSpecExp(exp ? exp.trim() : '');
              }
          }
      })
      .catch((error) => console.error("Помилка:", error));
}, [id, specLabels]); 

  if (!Data) {
    return <div>Завантаження...</div>;
    }


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
      projTypeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    formData.append("userID", Data.userID);
    formData.append("title", formData.get("startup-name"));
    formData.append("description", formData.get("description"));
    formData.append("projectType", selectedProjectType === "Інше" ? customProjectType.trim() : selectedProjectType);

    const categoriesString = categories.join(", ");
    formData.append("category", categoriesString);

    let invest = formData.get("investment");
    if (!invest || invest.trim() === "") invest = "0";
    formData.set("investment", invest);

    try {
      const response = await fetch("http://localhost:8000/api/startup", {
        method: "POST",
        body: formData,
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
                    {categories.map((category, index) => (
                      <span
                        key={category}
                        onClick={() => handleRemoveCategory(category)}
                        style={{ cursor: "pointer" }}
                      >
                        {category}
                        {index < categories.length - 1 && <span>, </span>}
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
                  <option value="">- Вибрати -</option>
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
              <div className="category-input">
                <select
                  id="projectType"
                  name="projectType"
                  className="input-info-create-proj"
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  ref={projTypeRef}
                >
                  <option value="">- Вибрати -</option>
                  <option value="Стартап">Стартап</option>
                  <option value="Малий бізнес">Малий бізнес</option>
                  <option value="Пілотний проєкт">Пілотний проєкт</option>
                  <option value="MVP">MVP</option>
                  <option value="Інше">Інше</option>
                </select>
                {selectedCategory === "Інше" && (
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
              <input
                type="text"
                id="investment"
                name="investment"
                className="input-info-create-proj"
                placeholder="Наприклад 2 000 гривень"
              />
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

            {/* Кнопки */}
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
      <MyFooter />
    </>
  );
};

export default CreateStartupPage;
