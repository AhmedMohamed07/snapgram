import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {  PostValidation } from '../../lib/validation';
import FileUploader from '../shared/FileUploader';
import { useUserContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCreatePost, useUpdatePost } from '../../lib/react-query/queriesAndMutations';
import Loader from '../shared/Loader';


const PostForm = ({ post, action }) => {
const { user } = useUserContext();
const navigate = useNavigate();
const { toast } = useToast();

const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()
const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

  const form = useForm({
    resolver: zodResolver( PostValidation),
    defaultValues: {
      caption: post? post?.caption : '',
      file:[],
      location: post? post?.location : '',
      tags: post? post?.tags.join(',') : ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(value) {
    // ACTION = UPDATE
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/posts/${post.$id}`);
    }


    const newPost = await createPost({
      ...value,
        userId: user.id
      })

      if (!newPost) {
        toast({
          title: 'Post does not created .. please try again!'
        })
      };

      navigate('/');
  };

  return (
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                    className="shad-textarea custom-scrollbar"
                    {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                    className="shad-textarea custom-scrollbar"
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input className="shad-input" type='text' {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
            )}
        />


        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Art, Expression, Learn"
                  className="shad-input"
                  type='text' {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
            )}
        />

        <div className="flex gap-8 justify-end ">
               <Button 
                type="button"
                className='shad-button_dark_4'
                onClick={()=> navigate(-1)} >
                  Cancel
               </Button>

               <Button 
                type="submit"
                className='shad-button_primary whitespace-nowrap'
                disabled= {isLoadingCreate || isLoadingUpdate}
                >
                {/* {(isLoadingCreate || isLoadingUpdate)? <Loader /> :  `${action} Post` } */}

                {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                {action} Post
                              
               </Button>
        </div>


    </form>
  </Form>
  )
};

export default PostForm;
