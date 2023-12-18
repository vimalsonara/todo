import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import useUserStore from "../store/UserStore.ts";

type Inputs = {
  title: string;
  content: string;
};

function AddTodo() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("/api/todos/add", {
        title: data.title,
        content: data.content,
        userId: user?.id,
      });
      if (response.status === 201) {
        console.log(response);
        toast.success("Todo added successfully");
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-2 border p-5 rounded-lg"
      >
        <h1 className="text-2xl text-center text-white">Add Todo</h1>
        <input
          type="text"
          className={
            errors.content
              ? "border-2 border-red-500 rounded p-1 outline-none"
              : "rounded p-1 outline-none"
          }
          placeholder="Title*"
          {...register("title", { required: true, maxLength: 80 })}
        />
        {errors.title && <span className="text-red-500">Title required.</span>}
        <input
          type="text"
          className={
            errors.content
              ? "border-2 border-red-500 rounded p-1 outline-none"
              : "rounded p-1 outline-none"
          }
          placeholder="Description*"
          {...register("content", { required: true, maxLength: 100 })}
        />
        {errors.content && (
          <span className="text-red-500">Description required.</span>
        )}
        <Button className="bg-blue-500 hover:bg-blue-900">Submit</Button>
      </form>
      <Link to={"/"}>
        <Button className="mt-2" variant={"outline"}>
          Go back
        </Button>
      </Link>
      <Toaster />
    </div>
  );
}

export default AddTodo;
