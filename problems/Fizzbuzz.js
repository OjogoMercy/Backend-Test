function fizzbuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

const arrayOfObjects = [
  { id: 1, username: "mercy", color: "red" },
  { id: 2, username: "alex", color: "white" },
  { id: 3, username: "favour", color: "green" },
  { id: 2, username: "alex_duplicate", color: "blue" },
  { id: 1, username: "mercy_backup", color: "black" },
];

// function to return a unique array of objects using a filter
function uniqueArray(n) {
  const map = new Map();
  n.forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
}
const newArray = uniqueArray(arrayOfObjects);
console.log(newArray);

const appointments = [
  { id: 1, patient: "Amina", status: "completed" },
  { id: 2, patient: "John", status: "pending" },
  { id: 3, patient: "Seyi", status: "completed" },
  { id: 4, patient: "Chidi", status: "cancelled" },
  { id: 5, patient: "Fatima", status: "pending" },
];
// function to tind the number of items of a field
function countFields(num) {
  const statusCount = {};
  num.forEach((item) => {
    const status = item.status;
    if (statusCount[status] >= 1) {
      statusCount[status] += 1;
    } else {
      statusCount[status] = 1;
    }
  });
  return statusCount;
}
console.log(countFields(appointments));
const transactions = [
  { id: 1, category: "medical", amount: 5000 },
  { id: 2, category: "transport", amount: 1500 },
  { id: 3, category: "medical", amount: 2000 },
  { id: 4, category: "food", amount: 3000 },
  { id: 5, category: "transport", amount: 1000 },
];
// function to find the total amount for each category
function sumAmount(num) {
  const totalAmount = {};
  num.forEach((item) => {
    const category = item.category;
    const amount = item.amount;
    if (totalAmount[category] >= 0) {
      totalAmount[category] += amount;
    } else {
      totalAmount[category] = amount;
    }
  });
  return totalAmount;
}
console.log(sumAmount(transactions));
const user = [
  {
    id: 1,
    profile: {
      name: "Mercy",
      settings: {
        theme: "dark",
        notifications: true,
      },
    },
  },
  {
    id: 2,
    profile: {
      name: "Ade",
      settings: {
        theme: "light",
        notifications: false,
      },
    },
  },
];
// function to check through nested objects
function getNestedObject(obj, keys) {
  let currentState = obj;
  for (const key of keys) {
    if (currentState && currentState[key] != null) {
      currentState = currentState[key];
    } else {
      return "Not available";
    }
  }
  return currentState;
}
const allThemes = user.map((item) =>
  getNestedObject(item, ["profile", "settings", "theme"]),
);
console.log(getNestedObject(user, "profile"));
console.log(allThemes);
const darkModeUser = user.find(
  (item) => getNestedObject(item, ["profile", "settings", "theme"]) === "dark",
);
console.log(darkModeUser.profile.name)
const medications = [
  "Paracetamol",
  "Ibuprofen",
  "Amoxicillin",
  "Vitamin C",
  "Insulin",
];
const query = "am";
// function to search through array of strings
function searchQuery(queries, string) {
  let filtered = [];
  const searchQuery = string.toLowerCase();
  for (const query of queries) {
    if (query.toLowerCase().includes(searchQuery)) {
      filtered.push(query);
    }
  }
  return filtered.length > 0 ? filtered : "No result";
}
console.log(searchQuery(medications, "p"));
