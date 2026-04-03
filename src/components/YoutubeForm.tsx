import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type formValues = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm = () => {
  const form = useForm({
    defaultValues: {
      username: 'default name',
      email: '',
      channel: '',
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // const { name, ref, onChange, onBlur } = register('username');

  const onSubmit = (data: formValues) => {
    console.log('Form Submitted', data);
  };

  renderCount++;
  return (
    <div>
      <h1>Youtube form({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          {/* <input type='text' id='username' name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> Lots of code to write */}
          <input
            type='text'
            id='username'
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid Email format',
              },
              validate: {
                notAdmin: (fieldvalue) => {
                  return (
                    fieldvalue != 'admin@example.com' ||
                    'Enter a different email'
                  );
                },
                notBlackListed: (fieldvalue) => {
                  return (
                    !fieldvalue.endsWith('baddomain.com') ||
                    'This domain is blacklisted'
                  );
                },
              },
            })}
          />

          <p className='error'>{errors.email?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            {...register('channel', {
              required: {
                value: true,
                message: 'Channel is required',
              },
            })}
          />

          <p className='error'>{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
