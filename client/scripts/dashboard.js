// Function to show a page and update active nav link
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));

    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');

    // Update active nav link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(link.dataset.page === pageId){
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Handle hash change
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if(hash) {
        showPage(hash);
    } else {
        showPage('home'); // default page
    }
}

// Run on page load
window.addEventListener('load', handleHashChange);

// Run when hash changes
window.addEventListener('hashchange', handleHashChange);

// Form wizard functionality
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    let currentStep = 0;

    nextBtn.addEventListener("click", () => {
        formSteps[currentStep].classList.remove("step-active");
        currentStep++;
        formSteps[currentStep].classList.add("step-active");
    });

    prevBtn.addEventListener("click", () => {
        formSteps[currentStep].classList.remove("step-active");
        currentStep--;
        formSteps[currentStep].classList.add("step-active");
    });

    // Optional: handle form submission
    document.getElementById("clientForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Form submitted! You can replace this with API call.");
        
    });


let calendar; // declare globally

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) { // only if #calendar exists on the page
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
       themeSystem: 'bootstrap5',
      events: [
        { title: 'Lawyer A - 10AM', start: '2025-08-20T10:00:00' },
        { title: 'Lawyer B - 2PM', start: '2025-08-21T14:00:00' }
      ]
    }); 
    calendar.render();

    // Fix compact display on first load
    setTimeout(() => {
      calendar.updateSize();
    }, 50);
  }
});

// When switching to schedule page
const scheduleBtn = document.querySelector('[data-page="schedule"]');
if (scheduleBtn) {
  scheduleBtn.addEventListener('click', function () {
    setTimeout(() => {
      if (calendar) calendar.updateSize();
    }, 50);
  });
}
