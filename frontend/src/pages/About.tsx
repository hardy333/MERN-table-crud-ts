import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type Form = {
  username: string;
  email: string;
  switch1: boolean;
};

const About = () => {
  const form = useForm<Form>({
    defaultValues: {
      username: "",
      email: "string",
      switch1: true,
    },
  });
  const { handleSubmit } = form;

  const onSubmit = (formData: Form) => {
    console.log(formData);

    // reset();
  };

  return (
    <div>
      <h1>Hello</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Switch */}
          <FormField
            control={form.control}
            name="switch1"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Regular Input */}
          <FormField
            control={form.control}
            name="username"
            rules={{
              required: {
                value: true,
                message: "fghj j kjj",
              },
            }}
            render={({ field }) => {
              // console.log(field);

              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "Enterr",
              },
            }}
            render={({ field }) => {
              // console.log(field);
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"string"}
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
          {/* <FormField
            control={form.control}
            name="email[1]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"string"}>
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
            )}
          /> */}
        </form>
      </Form>
    </div>
  );
};

export default About;
