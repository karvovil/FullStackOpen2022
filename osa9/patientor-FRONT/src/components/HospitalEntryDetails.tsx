const HospitalEntryDetails = ({discharge}:{discharge: {date:string, criteria: string}}) => {

    return (
        <>
            {discharge.date}<br/>
            <b>{discharge.criteria}</b>
        </>
    );

};
export default HospitalEntryDetails;