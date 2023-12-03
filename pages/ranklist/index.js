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
              <td>0x5351665ba811C7E0d085cF1040eDEBd4249cB385</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranklist;
