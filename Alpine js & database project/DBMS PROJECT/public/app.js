function App() {
	return {
		page: 1,
		faculties: [],
		t_comments: [],
		t_courses:[],
		fal_ID :null,
		
		async getfaculties() {
			const faculties = await fetch("/api/faculties").then((res) => res.json());
			this.faculties = faculties;
		},
		async getCourses(fid) {
			this.fal_ID=fid;
			const t_courses = await fetch(`/api/t_courses/${fid}`).then((res) => res.json());
			this.page = 2;
			this.t_courses = t_courses;
	},
		
		async getTeacherComments(cid) {
			const t_comments = await fetch(`/api/t_comments/${this.fal_ID}/${cid}`).then((res) => res.json());
			this.page = 3;
			this.t_comments = t_comments;
			console.log(cid,this.fal_ID);
	}


		
	};
}
