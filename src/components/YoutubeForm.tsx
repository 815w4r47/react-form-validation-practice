import { useForm, useFieldArray, type FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';

let renderCount = 0;

type formValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumber: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export const YoutubeForm = () => {
  const form = useForm<formValues>({
    defaultValues: async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1',
      );
      const data = await response.json();
      return {
        username: data.username,
        email: data.email,
        channel: data.website,
        social: {
          facebook: '',
          twitter: '',
        },
        phoneNumbers: ['', ''],
        phNumber: [{ number: '' }],
        age: 0,
        dob: new Date(),
      };
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;
  console.log({ touchedFields, dirtyFields, isDirty, isValid });

  // const { name, ref, onChange, onBlur } = register('username');

  const { fields, append, remove } = useFieldArray({
    name: 'phNumber',
    control,
  });

  const onSubmit = (data: formValues) => {
    console.log('Form Submitted', data);
  };

  const onError = (errors: FieldErrors<formValues>) => {
    console.log('Form Errors', errors);
  };

  const handleGetValue = () => {
    console.log('Get Values', getValues('social.twitter'));
  };

  const handleSetValue = () => {
    setValue('username', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return subscription.unsubscribe;
  // }, [watch]);

  // const watchUserName = watch();

  renderCount++;
  return (
    <div>
      <h1>Youtube form({renderCount / 2})</h1>
      {/* <h2>Watched Value: {JSON.stringify(watchUserName)}</h2> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
              disabled: true,
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

        <div className='form-control'>
          <label htmlFor='facebook'>Facebook</label>
          <input
            type='text'
            id='facebook'
            {...register('social.facebook', {
              required: {
                value: true,
                message: 'facebook is required',
              },
            })}
          />

          <p className='error'>{errors.social?.facebook?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='twitter'>Twitter</label>
          <input
            type='text'
            id='twitter'
            {...register('social.twitter', {
              required: {
                value: true,
                message: 'twitter is required',
              },
              disabled: watch('channel') === '',
            })}
          />

          <p className='error'>{errors.social?.twitter?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='primary-phone'>Primary Phone Number</label>
          <input
            type='text'
            id='primary-phone'
            {...register('phoneNumbers.0', {
              required: {
                value: true,
                message: 'Primary Phone Number is required',
              },
            })}
          />

          <p className='error'>{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='secondary-phone'>Secondary Phone Number</label>
          <input
            type='text'
            id='secondary-phone'
            {...register('phoneNumbers.1', {
              required: {
                value: true,
                message: 'Secondary Phone Number is required',
              },
            })}
          />

          <p className='error'>{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div>
          <label>List of Phone Numbers</label>
        </div>

        <div>
          {fields.map((field, index) => {
            return (
              <div className='form-control' key={field.id}>
                <input
                  type='text'
                  {...register(`phNumber.${index}.number` as const)}
                />
                {index > 0 && (
                  <button type='button' onClick={() => remove(index)}>
                    Remove Phone Number
                  </button>
                )}
              </div>
            );
          })}
          <button type='button' onClick={() => append({ number: '' })}>
            Add Phone Number
          </button>
        </div>

        <div className='form-control'>
          <label htmlFor='age'>Age</label>
          <input
            type='number'
            id='age'
            {...register('age', {
              valueAsNumber: true,
              required: {
                value: true,
                message: 'Age is required',
              },
            })}
          />

          <p className='error'>{errors.age?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='dob'>Date of Birth</label>
          <input
            type='date'
            id='dob'
            {...register('dob', {
              valueAsDate: true,
              required: {
                value: true,
                message: 'DOB is required',
              },
            })}
          />

          <p className='error'>{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid}>Submit</button>
        <button type='button' onClick={handleGetValue}>
          Get Values
        </button>

        <button type='button' onClick={handleSetValue}>
          Set Values
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
