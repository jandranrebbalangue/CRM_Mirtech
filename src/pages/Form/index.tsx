import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/Input";
import Save from "../components/Save";
import Select from "../components/Select";
import { STATUS_OPTIONS } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../../utils/api";
import Spinner from "../components/Spinner";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface FormValues {
  name: string;
  contact: string;
  avatar: string;
  organization: string;
  assignedUser: string;
  status: string,
  createdAt: string,
}

const AddClientForm = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query
  const clientId = id as string
  const createMutation = api.client.createClient.useMutation();
  const readMutation = api.client.getClientDetailsById.useQuery({ id: clientId }, {
    enabled: !!clientId
  });

  const updateMutation = api.client.updateClient.useMutation();
  const assignedUserOptions = id ? api.client.getAll.useQuery().data?.filter((item) => item.id !== id).map((item) => ({
    label: item.name,
    value: item.name
  })) : api.client.getAll.useQuery().data?.map((item) => ({
    label: item.name,
    value: item.name
  }))
  const methods = useForm<FormValues>();
  const { handleSubmit, reset, watch } = methods;
  const status = watch("status");
  const assignedUser = watch("assignedUser")

  const createItem = async (data: FormValues) => {
    let { assignedUser } = data;
    const { name, organization, status, contact } = data;
    if (!assignedUser) {
      assignedUser = ""
    } else {
      assignedUser = data.assignedUser
    }
    const createdAt = dayjs().format("MM/DD/YYYY")
    await createMutation.mutateAsync({ name, contact, organization, status, createdAt, assignedUser })
    await router.push("/")
  };

  const updateItem = async (data: FormValues) => {
    let { assignedUser } = data;
    const { name, organization, status, contact } = data;
    if (!assignedUser) {
      assignedUser = ""
    } else {
      assignedUser = data.assignedUser
    }
    await updateMutation.mutateAsync({
      name, contact, organization, status, id: clientId, assignedUser
    })
    await router.push("/")
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (id) await updateItem(data)
    else await createItem(data)
  };

  useEffect(() => {
    let cancel = false;
    if (readMutation?.isFetched) reset({
      name: readMutation?.data?.name,
      contact: readMutation?.data?.contact,
      organization: readMutation?.data?.organization,
      status: readMutation?.data?.status,
      assignedUser: readMutation?.data?.assignedUser as string
    })
    if (cancel) return;
    return () => {
      cancel = true;
    };
  }, [readMutation?.data, readMutation?.isFetched, reset]);

  if (createMutation.isLoading) return <Spinner />;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {createMutation.error && <p>Something went wrong! {createMutation.error.message}</p>}
        <Row>
          <Col>
            <Input
              id="name"
              label="Name"
              horizontal={true}
            />
            <Input
              id="contact"
              label="Contact"
              horizontal={true}
            />
            <Input
              id="organization"
              label="Organization"
              horizontal={true}
            />
            <Select id="assignedUser" label="Assigned User"
              horizontal={true}
              options={assignedUserOptions || []}
              value={assignedUser}
              placeholder="Select assigned user"
            />
            <Select
              id="status"
              label="Status"
              options={STATUS_OPTIONS}
              horizontal={true}
              value={status}
              placeholder="Select status"
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Save isSubmitting={createMutation.isSuccess} />
          </Col>
        </Row>
      </Form>
    </FormProvider>

  );
};

export default AddClientForm;
