
function waitingListFunction(){
    loadData();

    async function loadData(){
        const waitingList = await getWaitingList();
        tableList(waitingList); 
        searchPending();

    }

    function searchPending(){
        const input = document.getElementById("search_pending");

        input.addEventListener("input", function () {
            
            tableList(); //For loading

            clearTimeout(input.delayTimer); 
            input.delayTimer = setTimeout(async () => {
                let searchValue = this.value;

                getWaitingList(searchValue);
                
            }, 1500);
        });
    }
    

    function tableList(data) {
        const tableList = document.querySelector('.show-waitinglist');
    
        if (!data) {
            tableList.innerHTML = `<tr><td colspan="10" class="text-center">Loading...</td></tr>`;
            return;
        }

        let tableHTML = "";

        if(data.length === 0){
            tableList.innerHTML = "<tr><td class='no-data' colspan='10'> No data </td></tr>";
        }
        else{
            data.forEach((client) => {

                let lawyer = client.preferred_lawyer;

                if(lawyer === null){
                    lawyer = '---';
                }

                tableHTML += `<tr>
                    <td>${client.case_id}</td>
                    <td>${client.first_name} ${client.last_name}</td>
                    <td>${client.age}</td>
                    <td>${client.gender}</td>
                    <td>${client.email_address}</td>
                    <td>${client.contact_number}</td>
                    <td>${client.date_added}</td>
                    <td>${lawyer}</td>
                    <td>${client.preferred_date}</td>
                    <td>
                        <button class="view-files" data-path="${client.file_path}">
                            Files
                        </button>

                        <button class="assign_btn" data-id="${client.case_id}" data-status="open">
                            Assign
                        </button>

                    </td>

                </tr>`
                    
            });   

            tableList.innerHTML = tableHTML;
            viewFiles();
            assignFunction();
            }
    }

    function viewFiles() {
        const viewBtns = document.querySelectorAll(".view-files");

        viewBtns.forEach((btn) => {
            btn.addEventListener('click', function() {
                const path = this.dataset.path;

                // Check for null, empty string, or the string "null"
                if (!path || path === "null") {
                    Swal.fire({
                        icon: 'info',
                        title: `No attachments`,
                        text: `No attachments on this client`,
                        howConfirmButton: false
                    });
                    return; 
                }

                const filePath = `${path}`;
                const modalBody = document.getElementById('viewModalContent');
                const modalLabel = document.getElementById('viewModalLabel');
                modalLabel.textContent = 'Atttachments';
                modalBody.innerHTML = '';

                const fileExtension = filePath.split('.').pop().toLowerCase();
                const modal = new bootstrap.Modal(document.getElementById('viewModal'));
                modal.show();

                // Dynamically create and append the element based on file type
                if (fileExtension === 'pdf') {
                    const iframe = document.createElement('iframe');
                    iframe.src = filePath;
                    iframe.style.width = '100%';
                    iframe.style.height = '500px';
                    iframe.style.border = 'none';
                    modalBody.appendChild(iframe);
                } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                    const img = document.createElement('img');
                    img.src = filePath;
                    img.style.maxWidth = '100%';
                    modalBody.appendChild(img);
                } else {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = filePath;
                    downloadLink.textContent = `Download File: ${filePath.split('/').pop()}`;
                    downloadLink.target = "_blank";
                    downloadLink.className = "btn btn-primary";
                    modalBody.appendChild(downloadLink);
                }

                // Explicitly show the modal with JavaScript
                
            });
        });
    }


    function assignFunction(){

        const assignBtn = document.querySelectorAll(".assign_btn");

        assignBtn.forEach((btn) => {
            btn.addEventListener('click', async function() {
                const case_id = this.dataset.id;
                
                const modalBody = document.getElementById('viewModalContent');
                const modalFotter = document.getElementById('modal-footer');
                const modalLabel = document.getElementById('viewModalLabel');

                modalLabel.textContent = 'Assigned Section';
                modalBody.innerHTML = '';

                const modal = new bootstrap.Modal(document.getElementById('viewModal'));
                modal.show();

                const lawyersData = await lawyerFunction()

                const label = document.createElement('label');
                label.textContent = "Choose a lawyer:";
                label.style.marginBottom = "1em";
                label.setAttribute("for", "lawyerSelect");

                const saveBtn = document.createElement('button');
                
                saveBtn.type = "button";                      
                saveBtn.className = "btn btn-primary";        
                saveBtn.textContent = "Assign";
                saveBtn.id = "save_btn_id"

                // Append it into modal footer
                document.querySelector(".modal-footer").appendChild(saveBtn);

                const select = document.createElement('select');
                select.className = "form-select"; 
                select.id = "lawyerSelect";

                
                lawyersData.forEach(lawyer => {
                    const option = document.createElement('option');
                    option.value = lawyer.admin_id; // lawyers id
                    option.textContent = `Atty. ${lawyer.first_name} ${lawyer.last_name}`; // lawyers name
                    select.appendChild(option);
                });

                
                modalBody.appendChild(label);
                modalBody.appendChild(select);

                const modalEl = document.getElementById("viewModal");
                const bootstrapModal = bootstrap.Modal.getInstance(modalEl) 
                    || new bootstrap.Modal(modalEl);


                //Assign lawyer button on the assign modal
                document.getElementById('save_btn_id').addEventListener('click', function () {

                    const selectedLawyer = select.value;
                    //const statusSet = "assigning"

                    Swal.fire({
                        title: "Are you sure?",
                        text: "You want to assign this case?",
                        icon: "question",    
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6 ",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, assign it!"
                    }).then(async (alertResult) => {
                        if (alertResult.isConfirmed) {
                            
                            Swal.fire({
                                title: "Assigning...",
                                text: "Please wait",
                                allowOutsideClick: false,
                                didOpen: () => {
                                    Swal.showLoading();
                                } 
                            }); 

                            assignmentFunction(selectedLawyer, case_id)
                            bootstrapModal.hide();

                        } // end of if alertResult.isConfirmed
                    }); // end of then(alertResult)
                        
                });


                //Modal reset
                modalEl.addEventListener("hidden.bs.modal", () => {
                modalBody.innerHTML = "";   
                saveBtn.classList.add("saveBtn");
                
                if (saveBtn) {
                    saveBtn.remove();
                }
                
                });
                
            })
        })
    }

    
    async function lawyerFunction(){ //Get lawyer for dynamic list for assign modal

        try{
            const res = await fetch("http://localhost:3000/api/lawyers")
            const result = await res.json();            
            return result

        }catch(err){
            console.log(err)
        }

    }

    async function getWaitingList(search){

        try{

            const url = search 
            ? `http://localhost:3000/api/waitingList?search=${search}` 
            : `http://localhost:3000/api/waitingList`;

            const res = await fetch(url);

            const waitingList = await res.json();
            console.log(`This is the waiting list`,waitingList)

            tableList(waitingList);

            return waitingList;

        }catch(err){
            console.log(err)
        }

    }

   async function assignmentFunction(lawyerId ,caseId) {
        try {
            const res = await fetch("http://localhost:3000/api/assignment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    case_id: caseId,
                    lawyer_id: lawyerId
                })
            });

            const result = await res.json(); 

            if (result.success) {
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: `Success!`,
                    text: result.message,
                    showConfirmButton: false,
                    timer: 5000 
                });

                loadData();
            } else {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: result.message,
                    showConfirmButton: false,
                    timer: 5000
                });
            }


        } catch (err) {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Something went wrong, Please try again or refresh the page.`,
                showConfirmButton: false,
                timer: 5000
            });
        }
    }

}