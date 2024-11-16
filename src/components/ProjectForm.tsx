 
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем Bootstrap

// Определяем схему валидации с помощью Zod
const projectSchema = z.object({
  projectName: z.string().min(1, 'Имя проекта обязательно'),
  budget: z.string().min(1, 'Бюджет должен быть больше 0'),
  deadline: z.string().transform((str) => new Date(str)).refine((date) => date > new Date(), {
    message: 'Дата завершения должна быть в будущем',
  }),
  email: z.string().email('Неверный формат электронной почты'),
  phone: z.string().min(10, 'Телефон должен содержать минимум 10 символов'),
});

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (data) => {
    // Сохраняем данные в localStorage
    localStorage.setItem('projectData', JSON.stringify(data));
    alert('Проект успешно добавлен!');
  };

  return (
    <div className="container mt-5">
      <h2>Добавить новый проект</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
        <div className="mb-3">
          <label className="form-label">Имя проекта:</label>
          <input type="text" className="form-control" {...register('projectName')} />
          {errors.projectName && <div className="text-danger">{errors.projectName.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Бюджет в рублях:</label>
          <input type="number" className="form-control" {...register('budget')} />
          {errors.budget && <div className="text-danger">{errors.budget.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Крайняя дата завершения:</label>
          <input type="date" className="form-control" {...register('deadline')} />
          {errors.deadline && <div className="text-danger">{errors.deadline.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Электронная почта:</label>
          <input type="email" className="form-control" {...register('email')} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Телефон:</label>
          <input type="tel" className="form-control" {...register('phone')} />
          {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Добавить проект</button>
      </form>
    </div>
  );
};

export default ProjectForm;
