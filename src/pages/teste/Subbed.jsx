import { useContext } from 'react'
import { CourseContext } from './Sub'
import { useNavigate } from 'react-router-dom'


export default function Subbed() {

	const { course, setCourse } = useContext(CourseContext)

	const navigate = useNavigate()

	return (
		<div>
			<h1 className='font-bold text-3xl mb-4'>
				{course.titulo}
			</h1>
			<div className='flex flex-col gap-2'>
				{
					course.modulos.map(mod => (
						<div
							key={mod.id}
							className='flex gap-2 items-center rounded-md w-fit'
						>
							{mod.id}
							<span className='hover:bg-blue-100 rounded-md py-2 px-4 cursor-pointer'
								onClick={() => navigate(`/module/${mod.id}`)}>
								{mod.titulo}
							</span>
							<span
								className={`
									w-4 h-4 border-2 border-blue-400 rounded-full
									${mod.completo === 1 && 'bg-blue-500'}
								`}
							/>
						</div>
					))
				}
			</div>
		</div>
	)
}