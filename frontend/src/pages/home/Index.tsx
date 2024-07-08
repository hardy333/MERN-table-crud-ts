import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileCog, Plus, Trash } from "lucide-react";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { useFieldArray, useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import tablesAPI from "@/api/tablesAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
type FormData = {
  tableName: string;
  tableColumn: {
    columnName: string;
    columnType: string;
    canBeNull: boolean;
  }[];
};

const defaultColumnInputValues = {
  columnName: "",
  columnType: "string",
  canBeNull: true,
};

const Home = () => {
  const { toast } = useToast();

  const form = useForm<FormData>({
    defaultValues: {
      tableColumn: [defaultColumnInputValues],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "tableColumn",
    control,
  });
  const postTableForm = async (formData: FormData) => {
    const res = await tablesAPI.post("/", formData);
    return res;
  };

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: postTableForm,
    onSuccess: (data) => {
      console.log("Suuccess", data);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast({
        title: "Table Was created successfully !!",
        description: "Cngratulations ",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong please try again",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    console.log(formData);

    // reset();

    mutate(formData);
  };

  console.log(errors);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex content-center flex-col items-center mb-8 ">
            <Label className="mb-2 block text-lg">Table Name</Label>
            <div className="relative mt-4">
              <p className="text-[0.7rem] font-medium text-destructive absolute -top-5 left-0">
                {errors.tableName?.message}
              </p>
              <Input
                {...register("tableName", {
                  required: {
                    value: true,
                    message: "Please enter table name",
                  },
                  minLength: {
                    value: 2,
                    message: "Table Name should be at least 2 character",
                  },
                  maxLength: {
                    value: 20,
                    message: "Table Name should not be more than 20 character",
                  },
                })}
                className="w-[350px]"
                placeholder="Enter table Name"
              />
            </div>
          </div>
          <Separator className="mt-8" />

          <section className="my-4  grid gap-4 gap-y-8 grid-cols-4 items-center">
            <h2>Field Name</h2>
            <h2>Type</h2>
            <h2 className="col-span-2">Nulability</h2>

            {/* Dynamic FOrm START */}
            {/* Dynamic FOrm START */}

            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <div className="relative">
                  <Input
                    //
                    {...register(`tableColumn.${index}.columnName`, {
                      required: {
                        value: true,
                        message: "Please Enter Name",
                      },
                      minLength: {
                        value: 2,
                        message: "Field Name should be at least 2 character",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Field Name should not be more than 20 character",
                      },
                    })}
                    placeholder="Choose field name"
                  />
                  <p className="text-[0.7rem] font-medium text-destructive absolute -top-5 left-0">
                    {errors.tableColumn?.[index]?.columnName?.message}
                  </p>
                </div>

                {/* Select */}

                <FormField
                  control={form.control}
                  name={`tableColumn.${index}.columnType`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="string">string</SelectItem>
                            <SelectItem value="number">number</SelectItem>
                            <SelectItem value="boolean">boolean</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Switch */}
                <FormField
                  control={form.control}
                  name={`tableColumn.${index}.canBeNull`}
                  render={({ field }) => (
                    // <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  variant={"outline"}
                >
                  <Trash />
                </Button>
              </Fragment>
            ))}
          </section>

          {/* Dynamic FOrm EDN */}
          {/* Dynamic FOrm EDN */}

          <Separator className="mt-8" />
          <div className="mt-8 flex gap-4 ">
            <Button
              type="button"
              onClick={() => append(defaultColumnInputValues)}
            >
              <Plus />
              Add Another Field
            </Button>
            <Button type="submit" className="w-full ">
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Creating Table...
                </>
              ) : (
                <>
                  <FileCog />
                  Generate Table
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};

export default Home;
