import { useContext, useEffect, useState } from 'react'
import { CourseContext } from './Sub'
import { useNavigate, useParams } from 'react-router-dom'


export default function Content() {

	const { course, setCourse } = useContext(CourseContext)

	const navigate = useNavigate()

	const { id, contid } = useParams()

	const [content, setContent] = useState()

	function handleCompleteContent() {
		const currCourse = course

		currCourse.modulos.forEach(mod => {
			if(mod.id == id) {
				mod.conteudos.forEach(cont => {
					if(cont.id == contid) {
						return cont.completo = 1
					} else {
						return cont
					}
				})
			} else {
				return mod
			}
		})

		setContent(prev => ({
			...prev,
			completo: 1,
		}))
		setCourse(currCourse)
	}

	useEffect(() => {
		setContent(course.modulos.find(mod => mod.id == id).conteudos.find(cont => cont.id == contid))
	}, [id])

	return (
		<div>
			<h1 className='font-bold text-xl mb-4'>
				{content?.titulo}
			</h1>
			<div>
				{content?.completo === 0 ?
					<>
						<div>
							Não completo
						</div>
						<button className='py-2 px-4 rounded-md bg-blue-100 hover:bg-blue-200 active:bg-blue-300 transition-all' onClick={handleCompleteContent}>
							Completar
						</button>
					</>
					:
					<div>
						Completo
					</div>
				}
			</div>
		</div>
	)
}