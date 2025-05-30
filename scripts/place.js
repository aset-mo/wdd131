// Footer information
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;
const copyrightYearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');
copyrightYearElement.textContent = currentYear;
document.getElementById("lastModified").textContent = document.lastModified;
document.getElementById("year").textContent = new Date().getFullYear();