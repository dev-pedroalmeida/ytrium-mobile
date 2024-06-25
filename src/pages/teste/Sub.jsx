import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

export const CourseContext = createContext({
	course: {},
	setCourse: () => { }
})

export default function Sub() {
	const [course, setCourse] = useState({
		titulo: 'Teste',
		modulos: [
			{
				id: 1,
				titulo: 'Modulo 1',
				completo: 0,
				conteudos: [
					{
						id: 3,
						titulo: 'Jasava',
						completo: 0,
					},
					{
						id: 4,
						titulo: 'aog',
						completo: 0,
					},
				]
			},
			{
				id: 2,
				titulo: 'Modulo 2',
				completo: 0,
				conteudos: [
					{
						id: 5,
						titulo: 'juykuy',
						completo: 0,
					},
					{
						id: 6,
						titulo: 'r55',
						completo: 0,
					},
				]
			}
		]
	})

	return (
		<CourseContext.Provider value={{ course, setCourse }}>
			<div className='p-4'>
				<Outlet />
			</div>
		</CourseContext.Provider>
	)
}