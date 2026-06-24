import React from "react";

function ResponseCard({ data }) {
  return (
    <div className="response-card">

      <div className="box">
        <h3>User Details</h3>

        <p><b>User ID:</b> {data.user_id}</p>
        <p><b>Email:</b> {data.email_id}</p>
        <p><b>Roll Number:</b> {data.college_roll_number}</p>
      </div>

      <div className="box">
        <h3>Summary</h3>

        <p><b>Total Trees:</b> {data.summary.total_trees}</p>
        <p><b>Total Cycles:</b> {data.summary.total_cycles}</p>
        <p><b>Largest Tree Root:</b> {data.summary.largest_tree_root}</p>
      </div>

      <div className="box">
        <h3>Invalid Entries</h3>

        <pre>
          {JSON.stringify(data.invalid_entries, null, 2)}
        </pre>
      </div>

      <div className="box">
        <h3>Duplicate Edges</h3>

        <pre>
          {JSON.stringify(data.duplicate_edges, null, 2)}
        </pre>
      </div>

      <div className="box">
        <h3>Hierarchies</h3>

        <pre>
          {JSON.stringify(data.hierarchies, null, 2)}
        </pre>
      </div>

    </div>
  );
}

export default ResponseCard;