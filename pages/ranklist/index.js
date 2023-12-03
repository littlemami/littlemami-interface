const Ranklist = () => {
  return (
    <div>
      <div className="text-center mt-10">RankList</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th>Current Bought Node</th>
              <th>Current Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-base-200">
              <td>#</td>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Quality Control Specialist</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranklist;
