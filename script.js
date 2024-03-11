const dayDropdown = document.getElementById('day-dropdown');
const dishesContainer = document.getElementById('dishes-container');
const dishesList = document.getElementById('dishes-list');

// إنشاء قائمة الأيام في الdropdown
for (let i = 1; i <= 30; i++) {
  const option = document.createElement('option');
  option.textContent = `${i} رمضان`;
  option.value = i;
  dayDropdown.appendChild(option);
}

// تحديث الأطباق المخزنة في localStorage
let dishesByDay = JSON.parse(localStorage.getItem('dishesByDay')) || {};

// عرض قائمة الأطباق ليوم محدد
function showDishes() {
  const selectedDay = dayDropdown.value;
  if (selectedDay !== '') {
    dishesContainer.style.display = 'block';
    const dishes = getDishes(selectedDay);
    renderDishes(dishes);
  } else {
    dishesContainer.style.display = 'none';
  }
}

// الحصول على الأطباق ليوم محدد
function getDishes(day) {
  if (!dishesByDay[day]) {
    dishesByDay[day] = [];
  }
  return dishesByDay[day];
}

// حفظ الأطباق في localStorage
function saveDishesToLocalStorage() {
  localStorage.setItem('dishesByDay', JSON.stringify(dishesByDay));
}

// عرض الأطباق في القائمة
function renderDishes(dishes) {
  dishesList.innerHTML = '';
  dishes.forEach((dish, index) => {
    const listItem = document.createElement('li');
    const removeAdd = document.createElement('i')
    listItem.textContent = dish;
    removeAdd.classList = "fa-solid fa-trash-can"
    listItem.appendChild(removeAdd)
    removeAdd.addEventListener('click', () => removeDish(dayDropdown.value, index));

    dishesList.appendChild(listItem);
  });
}

// إضافة طبق
function addDish() {
  const dishNameInput = document.getElementById('dish-name');
  const dishName = dishNameInput.value.trim();
  if (dishName !== '') {
    const selectedDay = dayDropdown.value;
    const dishes = getDishes(selectedDay);
    dishes.push(dishName);
    renderDishes(dishes);
    dishNameInput.value = '';
    saveDishesToLocalStorage();
  } else {
    alert('الرجاء إدخال اسم الطبق');
  }
}

// حذف الطبق
function removeDish(day, index) {
  const dishes = getDishes(day);
  dishes.splice(index, 1);
  renderDishes(dishes);
  saveDishesToLocalStorage();
}
