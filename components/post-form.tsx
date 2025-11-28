"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { object, z } from "zod";
const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});
import { Input } from "./ui/input";
import Uploader from "./uploader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { generateSlug } from "@/lib/utils";
const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  categoryId: z.string(),
  tags: z.array(
    object({
      label: z.string(),
      value: z.string(),
    })
  ),
  categories: z
    .array(
      object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
  status: z.string(),
  slug: z.string().min(1, "Slug is required"),
});

export type FormValues = z.infer<typeof formSchema>;
const PostForm = ({
  id,
  title,
  content,
  imageUrl,
  categoryId,
  tags,
  categories,
  status,
  slug,
}: FormValues) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      title,
      content,
      imageUrl,
      categoryId,
      tags,
      categories,
      status,
      slug,
    },
    mode: "onBlur",
  });
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    if (id) {
      //TODO
    }
    // await createPost(data);
    toast.success("Post created successfully");
    router.refresh();
    router.push("/admin/posts");
  };
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 py-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      if (!form.getValues("slug")) {
                        form.setValue("slug", generateSlug(e.target.value), {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Image URL</FormLabel>
                <FormControl>
                  <Uploader />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Content</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Tags</FormLabel>
                <FormControl>
                  <CreatableSelect
                    isMulti
                    isClearable
                    {...field}
                    onCreateOption={(value) => {
                      const newOption = {
                        label: value,
                        value: value.toLocaleLowerCase(),
                      };
                      field.onChange([...field.value, newOption]);
                    }}
                    components={{ IndicatorSeparator: () => null }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Extra Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={categoryId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={status}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {["draft", "published"].map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <Button
          type="submit"
          className="col-span-2 w-32 mx-auto cursor-pointer"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Save Post
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
