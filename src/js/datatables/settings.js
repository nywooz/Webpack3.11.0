export const dtsett = {
    "ordering": true,
    "order": [[1, "asc"]],  //the first value of the inner array is the column to order on, and the second is 'asc' (ascending ordering) or 'desc' (descending ordering) as required


    /* Results in:
           <div>
             {length}
             {filter}
             <div>
               {table}
             </div>
             {information}
             {pagination}
           </div>
       */

    //"dom": '<"data-table-wrapper"lf<t>ip>',
    "dom":
    "<'row'<'col-sm-6'>" +
    "<'col-sm-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-5'i>" +
        "<'col-sm-7'p>>",
    //  // Original
        // "<'row'<'col-sm-6'l>" +
        // "<'col-sm-6'f>>" +
        //     "<'row'<'col-sm-12'tr>>" +
        // "<'row'<'col-sm-5'i>" +
        // "<'col-sm-7'p>>",

    "language": {
        "search": "_INPUT_",	//The token _INPUT_, if used in the string, is replaced with the HTML text box for the filtering input allowing control over where it appears in the string. If _INPUT_ is not given then the input box is appended to the string automatically.
        "searchPlaceholder": "Search...",
        "paginate": {
            "previous": "&lsaquo;",	//Text to use for the 'previous' pagination button (to take the user to the previous page).
            "next": "&rsaquo;"
        }
    },

    "pageLength": 25,		//Show 25 records per page
    "lengthMenu": [[50, 25, 100, -1], [50, 25, 100, "All"]],
};



