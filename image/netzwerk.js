$(document).ready(function() {

    // DataTable setup
    var hostsTable = $("#leases")

    // fill DataTable from CSV file
    var $rowCount = 0;
    Papa.parse("/data/leases.csv", {
        delimiter: ";",
        header: false,
        download: true,
        skipEmptyLines: true,
        step: function(row) {
            if ($rowCount == 0) {
                hostsTable.DataTable({ 
                    destroy: true,
                    responsive: true,
                    lengthMenu: [[25, 50, -1], [25, 50, "All"]],
                    columns : [
                        { "title": row.data[0] },
                        { "title": row.data[1] },
                        { "title": row.data[2] },
                        { "title": row.data[3], className: "text-right" },
                    ]
                });
            } else {
                rowData = [ 
                    '<a href="http://' + row.data[0] + '/">' + row.data[0] + '</a>', 
                    '<a href="http://' + row.data[1] + '/">' + row.data[1] + '</a>', 
                    row.data[2], 
                    row.data[3] ]
                hostsTable.DataTable().row.add(rowData).draw();
            }
            //console.log("Row:", row.data);
            $rowCount++;
        },
        complete: function() {
            //console.log("All done!");
        }
    });

});
