waitingListFunction();

function waitingListFunction(){
    loadData();

    //const adminId = localStorage.getItem("adminId"); // for grabbing a admin id from the jwt
    const adminId = 1;

    async function loadData(){
        const waitingList = await getWaitingList();
        const assignedList = await getAssigned();

        tableList(waitingList);
        asignedTable(assignedList);
        

    }
    
    async function getWaitingList(){

        try{

            const res = await fetch("http://localhost:3000/api/waitingList")

            const waitingList = await res.json();

            return waitingList;

        }catch(err){
            console.log(err)
        }

    }



    function tableList(data) {
         const tableList = document.querySelector('.show-waitinglist');
    
        if (!data) {
            tableList.innerHTML = `<tr><td colspan="6" class="text-center">Loading...</td></tr>`;
            return;
        }

        let tableHTML = "";

        if(data.length === 0){
            tableList.innerHTML = "<tr><td class='no-data' colspan='6'> No data </td></tr>";
        }
        else{
            data.forEach((client) => {
                tableHTML += `<tr>
                    <td>${client.first_name} ${client.last_name}</td>
                    <td>${client.age}</td>
                    <td>${client.gender}</td>
                    <td>${client.email_address}</td>
                    <td>${client.contact_number}</td>
                    <td>${client.date_added}</td>
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

    function asignedTable(data){
        const assignedTable = document.querySelector('.show-assignedList')

        if (!data) {
            tableList.innerHTML = `<tr><td colspan="6" class="text-center">Loading...</td></tr>`;
            return;
        }

        let tableHTML = "";

        if(data === 0){
            tableList.innerHTML = "<tr><td class='no-data' colspan='6'> No data </td></tr>";

        }else{
            data.forEach((item) => {

                let decision = item.decision_date

                if(item.decision_date === null){
                    decision = '---'
                }

                tableHTML+= ` <tr>
                    <td>${item.case_id}</td>
                    <td>Atty. ${item.first_name} ${item.last_name}</td>
                    <td>${item.assigned_date}</td>
                    <td>${item.assignment_status}</td>
                    <td>${decision}</td>
                </tr>

                `

            })

        }

        assignedTable.innerHTML = tableHTML;

    }


    function viewFiles() {
        const viewBtns = document.querySelectorAll(".view-files");

        viewBtns.forEach((btn) => {
            btn.addEventListener('click', function() {
                const path = this.dataset.path;

                // Check for null, empty string, or the string "null"
                if (!path || path === "null") {
                    alert("No file attached to this case.");
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
                console.log(lawyersData)

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
                    option.value = lawyer.admin_id;          // lawyer id
                    option.textContent = `Atty. ${lawyer.first_name} ${lawyer.last_name}`; // lawyer name
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
                    const statusSet = "assigning"
                    console.log(`Lawyer ${selectedLawyer}, case id ${case_id} admin id ${adminId}`)

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

                            assignmentFunction(statusSet, selectedLawyer, case_id, adminId)
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




    
    async function lawyerFunction(){

        try{
            const res = await fetch("http://localhost:3000/api/lawyers")
            const result = await res.json();            
            return result

        }catch(err){
            console.log(err)
        }

    }

    async function getAssigned(){

        try{

            const res = await fetch("http://localhost:3000/api/assigned")
            const result = await res.json();
            return result;
            

        }catch(err){
           console.log(err); 
        }

    }

   async function assignmentFunction(status, lawyerId ,caseId, adminId) {
        try {
            const res = await fetch("http://localhost:3000/api/assignment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    case_status: status,
                    case_id: caseId,
                    lawyer_id: lawyerId,
                    admin_id: adminId
                })
            });

            const result = await res.json(); 

            if (result.success) {
                Swal.close();
                alert(result.message);
                loadData();
            } else {
                console.log(`Error updating: ${result.message}`);
            }


        } catch (err) {
            console.error("Fetch error:", err);
        }
    }




}