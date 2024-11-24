// src/utils/sweetalert-utils.js
import Swal from 'sweetalert2';

export const showConfirmCancelAlert = (onConfirm) => {
    Swal.fire({
        title: 'Confirmar Cancelación',
        html: `
            <p>¿Estás seguro de que deseas abandonar la creación del requerimiento?</p>
            <small>Todos los cambios no guardados se perderán permanentemente.</small>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, descartar cambios',
        cancelButtonText: 'Continuar editando',
        background: '#f4f4f4',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
};

export const showFormValidationAlert = (fieldName) => {
    const fieldTranslations = {
        tipo: 'Tipo de Requerimiento',
        estado: 'Estado',
        categoria: 'Categoría',
        prioridad: 'Prioridad',
        asunto: 'Asunto',
        descripcion: 'Descripción'
    };

    Swal.fire({
        icon: 'warning',
        title: 'Formulario Incompleto',
        html: `
            <p>Por favor complete el campo: <strong>${fieldTranslations[fieldName]}</strong></p>
            <small>Todos los campos marcados son obligatorios para crear un requerimiento.</small>
        `,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
        background: '#f4f4f4',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'swal2-confirm'
        }
    });
};

export const showSuccessAlert = (onClose) => {
    Swal.fire({
        icon: 'success',
        title: 'Requerimiento Registrado',
        text: 'El requerimiento se ha guardado exitosamente',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        showClass: {
            popup: ''
        },
        hideClass: {
            popup: ''
        },
        buttonsStyling: false,
        customClass: {
            popup: 'professional-alert',
            confirmButton: 'swal2-confirm'
        },
        backdrop: 'rgba(0,0,0,0.2)',
        background: '#ffffff',
        width: '380px'
    }).then(() => {
        onClose();
    });
};

export const showErrorAlert = (errorMessage) => {
    Swal.fire({
        icon: 'error',
        title: 'Error en el Registro',
        text: errorMessage || 'No se pudo guardar el requerimiento',
        showClass: {
            popup: ''
        },
        hideClass: {
            popup: ''
        },
        customClass: {
            popup: 'professional-alert',
            confirmButton: 'swal2-confirm'
        },
        backdrop: 'rgba(0,0,0,0.2)',
        background: '#ffffff',
        width: '380px'
    });
};