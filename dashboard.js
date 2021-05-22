// api
const apiUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "ccyy915";
// dashboard
const productCount = document.querySelector('#productCount');

const app = {
    data: {
        products: []
    },
    getData() {
        // console.log('get data start');
        axios.get(`${apiUrl}/api/${apiPath}/admin/products?`)
            .then(res => {
                if (res.data.success) {
                    this.data.products = res.data.products;
                    // console.log(this.data.products);
                    this.render();
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    deleteData(e) {
        // console.log('delete data start');
        const id = e.target.dataset.id;
        console.log(id);
        axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${id}`)
            .then(res => {
                if (!res.data.success) {
                    alert(res.data.message);
                    return;
                } else {
                    alert(res.data.message);
                    app.getData(); // 為什麼這邊會需要用app.而非this.呢
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    logout() {
        axios.post(`${apiUrl}/logout`)
            .then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    window.location.href = "https://ccyy915.github.io/Vue3-week2/";
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    render() {
        // console.log('render start');
        const productList = document.querySelector('#productList');
        productCount.textContent = this.data.products.length;
        let str = "";
        this.data.products.forEach((item) => {
            str += `
            <tr>
                <td>${item.title}</td>
                <td width="120">
                ${parseInt(item.origin_price).toLocaleString()}
                </td>
                <td width="120">
                ${parseInt(item.price).toLocaleString()}
                </td>
                <td width="100">
                    <span class="">${item.is_enabled ? '已啟用' : '未啟用'}</span>
                </td>
                <td width="120">
                    <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
                        data-action="remove" data-id="${item.id}"> 刪除 </button>
                </td>
            </tr>`
        });
        productList.innerHTML = str;
        // delete product
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        // console.log(deleteBtn);
        deleteBtn.forEach(item => {
            item.addEventListener('click', this.deleteData);
        })
        // logout
        const logoutBtn = document.querySelector('#logoutBtn');
        logoutBtn.addEventListener('click', this.logout);
    },
    created() {
        // get cookie
        const token = document.cookie.split(', ').find(row => row.startsWith('hexToken=')).split('=')[1];
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    }
}

app.created();