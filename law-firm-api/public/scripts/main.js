document.addEventListener('DOMContentLoaded', function (){

  loadData()

})

async function loadData(){

  const userDetails = await user()
  console.log(userDetails)

  roleTabIdentifier(userDetails)
}


async function user(){

  try{

    const res = await fetch('http://localhost:3000/auth/me')
    const result = await res.json();
    return result;


  }
  catch(err){
    console.log(err)
  }

}

function roleTabIdentifier(userDetails){

  const role = userDetails.role;

  const caseList = document.getElementById('case_list')
  const navLink = document.querySelectorAll('.nav-link')

  navLink.forEach((item) => {
    console.log("link ",item.dataset.page)
  })
  

  console.log(`User role: ${role}`)

  

}


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



/* //Statistics scripts
const ctx = document.getElementById('pie-chart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',   // 🔑 set type to "pie" (or "doughnut")
      data: {
        labels: ['Male', 'Female'],  // categories
        datasets: [{
          label: 'Clients by Gender',
          data: [10, 11], // sample values
          backgroundColor: [
            
            '#3498db', // blue
            
            '#f06050ff'  // red
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'  // moves legend to the right
          },
          title: {
            display: true,
            text: 'Clients by Gender'
          }
        }
      }
    });


    
const request_chart = document.getElementById('req-chart').getContext('2d');

new Chart(request_chart, {
  type: 'bar',
  data: {
    labels: ['Legal Consultation', 'Document Services', 'Litigation & Court Representation', 'Dispute Resolution', 'Specialized Legal Services'],
    datasets: [{
      label: 'Most Requested Services',
      data: [3, 7, 4, 6, 5],
      backgroundColor: '#3498db'
    }]
  },
  options: {
    indexAxis: 'y', // makes it horizontal bar
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Request type' }
    }
  }
});



const clientGrowth = document.getElementById('clientGrowthChart').getContext('2d');

  new Chart(clientGrowth , {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // months
      datasets: [{
        label: 'New Clients',
        data: [3, 7, 4, 6, 9, 5, 8, 3,8, 2, 11, 12], // sample client counts
        borderColor: '#3498db',   // blue line
        backgroundColor: '#3498db',
        tension: 0.3,             // smooth curve
        fill: false               // don’t fill under line
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Client Growth (Monthly)'
        }
      },
      scales: {
        x: { display: true },
        y: {
          display: true,
          beginAtZero: true      // start y-axis at 0
          // type: 'logarithmic'  // you can enable this if you *really* want log scale
        }
      }
    }
  }); */