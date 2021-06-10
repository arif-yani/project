const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
    const { name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading } = request.payload;

    const id = nanoid(16);

    const insertAt = new Date().toISOString();
    const updateAt = insertedAt;
    
    const finished = false;
    if(pageCount === readPage){
        finished = true;
    }

    const newBook = {
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading,
            id,
            finished,
            insertedAt,
            updateAt,
    };
    books.push(newBook);

    const isSuccess = books.filter((note) => note.id ===  id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    if(name === ''){
    const response = h.response({
        status: 'fail',
        message: 'Gagagl menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
    }
    if(readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    } 

        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan'
        });
        response.code(500);
        return response;
};

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },
});

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return { 
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',

    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const updateAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if(index !== -1) {
        books[index] = {
            ...books[index],
            name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updateAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });
        response.code(200);
        return response;
    }

    if(name === '' || readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagagl memperbarui buku'
        });
        response.code(400);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku in, Id tidak ditemukan'
    });
    response.code(404);
    return response;

};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);
    if(index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus, Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };