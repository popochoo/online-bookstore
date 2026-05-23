import { Controller, UseFormReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { validEmail } from '@/src/shared/regex'
import { IAuthForm } from '@/src/shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({
	form,
	isPending,
	isReg = false
}: AuthFieldsProps) {
	return (
		<>
			{isReg && (
				<Controller
					name='name'
					control={form.control}
					rules={{
						required: 'Имя обязательно'
					}}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='auth-name'>Имя</FieldLabel>
							<Input
								{...field}
								id='auth-name'
								disabled={isPending}
								placeholder='Иван'
								autoComplete='name'
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			)}
			<Controller
				name='email'
				control={form.control}
				rules={{
					required: 'Email обязателен',
					pattern: {
						value: validEmail,
						message: 'Введите валидный Email'
					}
				}}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor='auth-email'>Email</FieldLabel>
						<Input
							{...field}
							id='auth-email'
							type='email'
							disabled={isPending}
							placeholder='example@mail.com'
							autoComplete='email'
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>
			<Controller
				name='password'
				control={form.control}
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Минимальная длина пароля 6 символов'
					}
				}}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor='auth-password'>Пароль</FieldLabel>
						<Input
							{...field}
							id='auth-password'
							type='password'
							disabled={isPending}
							placeholder='******'
							autoComplete='current-password'
							aria-invalid={fieldState.invalid}
						/>
						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>
		</>
	)
}
