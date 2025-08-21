

getClientFunction()

async function getClientFunction(){

    
    let currentPage = 1;
    let pageSize = 10;
    getClient(1)//For first page
    document.querySelector("a[data-page='prev']").parentElement.classList.toggle("disabled");

    document.getElementById("client-page").addEventListener("click", async (e) => {
        e.preventDefault();
        
        const target = e.target.closest("a[data-page]");
        if (!target) return; // clicked somewhere else

        const action = target.dataset.page;

        if (action === "prev" && currentPage > 1) {
        currentPage--;
        } else if (action === "next") {
        currentPage++;
        }

        const response = await getClient(currentPage);

        if (response) {
            const dataLength = response.data.length;
            const totalPages = response.totalPages;

            console.log(`Current Page: ${currentPage}, Data length: ${dataLength}`);

            // disable buttons
            document.querySelector("a[data-page='prev']").parentElement.classList.toggle("disabled", currentPage === 1);
            document.querySelector("a[data-page='next']").parentElement.classList.toggle("disabled", currentPage >= totalPages);
        };

        

    });


    async function getClient(page){
        
        try{
            const res = await fetch(`http://localhost:3000/api/getClient?page=${page}&pageSize=${pageSize}`)
            
            const dataResponse = await res.json()
            
            if(!res.ok){
                throw(`Error fetching data:`, res.message)
            }

            
            table(dataResponse.data)
            return dataResponse;


        }catch(err){
            console.log(err)


        }

    }

    function table(data) {
         const table = document.querySelector('.show-client');

        if (!data) {
            table.innerHTML = `<tr><td colspan="6" class="text-center">Loading...</td></tr>`;
            return;
        }

        let tableHTML = "";

        if(data.length === 0){
            table.innerHTML = "<tr><td class='no-data' colspan='6'> No data </td></tr>";
        }
        else{
            data.forEach((client) => {
                tableHTML += `<tr>
                    <td>${client.first_name} ${client.last_name}</td>
                    <td>${client.age}</td>
                    <td>${client.gender}</td>
                    <td>${client.email_address}</td>
                    <td>${client.contact_number}</td>
                    <td>${client.case_status}</td>
                    <td>${client.date_added}</td>

                </tr>`
                    
            });

            table.innerHTML = tableHTML;
        
        }
    }




}