import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import Item from "./Item";
import Spinner from "../components/Spinner";
import Filters from "../components/Filter";
import { CLIENTS_KEY } from "../constants";

const List: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  let clients;
  if (statusFilter !== undefined && dateFilter !== "") {
    clients = api.client.fetchClientByCreationDateAndStatus.useQuery({ status: statusFilter, createdAt: dateFilter })
  } else if (dateFilter !== "" && dateFilter !== undefined) {
    clients = api.client.fetchClientByCreationDate.useQuery({ createdAt: dateFilter })
  } else if (statusFilter) {
    clients = api.client.fetchClientByStatus.useQuery({ status: statusFilter });
  } else {
    clients = api.client.getAll.useQuery();
  }

  const data = clients.data;
  const { isFetching } = clients
  if (data?.length) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(data))
  }
  const router = useRouter();
  let body;

  if (isFetching) {
    body = <Spinner />
  } else if (data?.length === 0) {
    body = <div className="text-center">
      <h5>Add your first client</h5>
      <Link
        id="addFromEmpty"
        href={"/add"}
        className="btn btn-primary text-light mt-2"
      >
        <FontAwesomeIcon icon={faPlus} className="me-2" />
        <span> Add</span>
      </Link>
    </div>
  } else {
    body = data?.map((item) => <Item
      key={item.id}
      id={item.id}
      contact={item.contact}
      name={item.name}
      organization={item.organization}
      status={item.status}
      createdAt={item.createdAt || ""}
      assignedUser={item.assignedUser || ""}
    />
    )
  }

  return (
    <>
      <div className="list w-100">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1 className="m-4">Clients</h1>
          <div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => { void router.push("/add"); }}
              className="text-light me-2"
            >
              Add Client
            </Button>

            <Button
              type="button"
              variant="outline-dark"
              size="sm"
              onClick={() => {
                setShowFilters((prev) =>
                  !prev
                );
              }}
            >
              <FontAwesomeIcon icon={faFilter} className="me-2" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </div>
        {showFilters && <Filters setStatusFilter={setStatusFilter} setDateFilter={setDateFilter} />}
        {body}
      </div>
    </>
  );
}

export default List;
