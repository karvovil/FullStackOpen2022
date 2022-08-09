interface OccupationalDetails {
    employerName: string;
    sickLeave: {
        startDate: string;
        endDate: string
    } | undefined
}
const OccupationalHealthcareEntryDetails = ({employerName, sickLeave}: OccupationalDetails) => {
    const sickleaveDetails = sickLeave ? `<br/> sick leave:  ${sickLeave.startDate} - ${sickLeave.endDate}` : null;
    return (
        <>
            employer: {employerName}
            {sickleaveDetails}
        </>
    );
    
    };
    export default OccupationalHealthcareEntryDetails;