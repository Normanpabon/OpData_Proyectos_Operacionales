import { ExportToCsv } from 'export-to-csv';
import { useUser } from "../context/UserContext";
function ProjectQuickExportCsv({ open }) {
    
  
    
    {/**No se estan pasando actualmente a las opciones, definen las columnas del csv */}
    const headers = [
        {label: "Fecha_registro", key: "fecha_reg"},
        {label: "Fecha_inicio", key: "fecha_ini"},
        {label: "Fecha_fin", key: "fecha_end"},
        {label: "Nombre proyecto", key: "desc_pro"},
        {label: "Estado", key: "estado"},
        {label: "Observaciones", key: "obs"},
    ];

    {/**Importar metodo para devolver los proyectos filtrados */}
    const { returnShowedProjects } = useUser();


    {/**Borrar el test data cuando se recuperen los proyectos mostrados en el dash */}
    
    const testData = [
        {fecha_reg: "11/20/2022", fecha_ini: "11/25/2022", fecha_end: "11/25/2022", desc_pro: "Proyecto prueba CSV", estado: "Activo", obs:"proyectoTest", unidad:"Unidad de software"},
        {fecha_reg: "09/20/2022", fecha_ini: "10/25/2022", fecha_end: "11/25/2022", desc_pro: "Proyecto prueba CSV 2", estado: "En espera", obs:"proyectoTest 2", unidad:"Unidad de software"}
    ];

    var dataObtainedFromContext = [{}];

    {/**Opciones para export-to-csv */}
    const options = {
            fieldSeparator:',',
            filename:'Reporte generado INSERTAR FECHA Y UNIDAD',
            quoteStrings:'"',
            decimalSeparator:'.',
            showLabels:true,
            showTitle:false,
            title: 'Reporte proyectos',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true
    };

    const csvExporter = new ExportToCsv(options);
    
    return (
        <>
        <div
        className="tooltip tooltip-right"
        data-tip="Exportar proyectos en pantalla a un archivo CSV"
      >
        <label
          onClick={() => {
            

            {/** Aca agregar logica de datos a filtrar y descargar para generar el csv */}
            console.log("Se ha precionado el boton para generar el reporte");
            {/**Todo: Esta mandando todos los proyectos, no solo los mostrados actualmente al */}
            dataObtainedFromContext = returnShowedProjects();
            
            var dataLenght = Object.keys(dataObtainedFromContext).length;

            // Si la informacion recuperada esta nula, no la exportamos
            if(dataLenght > 2){
              csvExporter.generateCsv(dataObtainedFromContext);
            }else{
              console.log("No esta definida la data aun");
            }
            
          
            
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>

            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">Exportar en CSV</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
        
        </>

    );
};

export default ProjectQuickExportCsv;